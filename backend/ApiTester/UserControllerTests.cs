using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using FluentAssertions;
using Xunit;
using Xunit.Abstractions;
using Xunit.Sdk;

namespace ApiTester {
    public class UserControllerTests : ControllerTestBase {
        private ITestOutputHelper logger;
        
        public UserControllerTests(WebApiTesterFactory factory, ITestOutputHelper logger) : base(factory) {
            this.logger = logger;
        }

        [Fact]
        public void TestLogin() {
            var response = client.PostAsync("/api/users/login", 
                new FormUrlEncodedContent(
                    new [] {
                        new KeyValuePair<string, string>("Username", "shanekim12345"),
                        new ("Password", "supersecretpassword")
                    })).Result;
            
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            logger.WriteLine(response.Content.ReadAsStringAsync().Result);
            logger.WriteLine(response.Headers.Single(header => header.Key == "Set-Cookie").Value.First());
        }

        [Fact]
        public void TestGetTasks() {
            client.SetFakeBearerToken((object) token);
            var response = client.GetAsync("/api/users/user/shanekim12345/tasks").Result;
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}