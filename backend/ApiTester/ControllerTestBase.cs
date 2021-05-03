using System;
using System.Dynamic;
using System.Net.Http;
using Xunit;

namespace ApiTester {
    public class ControllerTestBase : IClassFixture<WebApiTesterFactory> {
        protected readonly WebApiTesterFactory factory;
        protected HttpClient client;
        protected dynamic token;

        public ControllerTestBase(WebApiTesterFactory factory) {
            this.factory = factory;
            client = factory.CreateClient();

            token = new ExpandoObject();
            token.nameid = "7";
            token.nbf = 1619824922;
            token.exp = 1629925822;
            token.iat = 1619824922;
        }
    }
}