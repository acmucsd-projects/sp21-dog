using System;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.EnvironmentVariables;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SlideSync.Config;
using SlideSync.Data.Context;
using SlideSync.Data.Repositories;
using SlideSync.Data.Repositories.Contracts;

namespace SlideSync {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
            TokenValidationParameters = new TokenValidationParameters {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["JWT:Secret"])),
                ClockSkew = TimeSpan.Zero
            };
        }

        public IConfiguration Configuration { get; }
        public static TokenValidationParameters TokenValidationParameters { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            
            services.AddControllers().AddNewtonsoftJson();
            
            services.AddCors(options => {
                options.AddPolicy("AllowOrigin",
                    builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            // Adds authentication middleware
            services.AddAuthentication(x => {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                }).AddJwtBearer(options => {

                    options.TokenValidationParameters = TokenValidationParameters;
                    
                    options.Events = new JwtBearerEvents {
                        OnAuthenticationFailed = context => {
                            if (context.Exception is SecurityTokenExpiredException) {
                                context.Response.Headers.Add("Token-Expired", "true"); 
                            }
                            return Task.CompletedTask;
                        }
                    };
                });
            
            // Configure Unit of Work
            services.AddDbContext<GameDbContext>(options => {
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddTransient<ITokenRepository, TokenRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<ITaskRepository, TaskRepository>();
            services.AddTransient<IAuthUnit, AuthUnit>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.Configure<JwtConfig>(options => Configuration.GetSection("JWT").Bind(options));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseCors();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
            
            using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope()) {
                var db = scope.ServiceProvider.GetRequiredService<GameDbContext>();
                db.Database.Migrate();
            }
        }
    }
}
