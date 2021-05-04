using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using SlideSync;
using WebMotions.Fake.Authentication.JwtBearer;

namespace ApiTester {
    public class WebApiTesterFactory : WebApplicationFactory<Startup> {
        protected override IWebHostBuilder CreateWebHostBuilder()
        {
            return WebHost.CreateDefaultBuilder()
                .UseStartup<Startup>();
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.UseContentRoot(".");
            builder
                .UseTestServer()
                .ConfigureTestServices(collection =>
                {
                    collection.AddAuthentication(options =>
                    {
                        options.DefaultAuthenticateScheme = FakeJwtBearerDefaults.AuthenticationScheme;
                        options.DefaultChallengeScheme = FakeJwtBearerDefaults.AuthenticationScheme;
                    }).AddFakeJwtBearer(options => {
                        options.BearerValueType = FakeJwtBearerBearerValueType.Base64;
                    });
                });
            base.ConfigureWebHost(builder);
        }
    }
}