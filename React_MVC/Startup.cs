using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(React_MVC.Startup))]
namespace React_MVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
