using System.IO;
using System.Reflection;
using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;

namespace PlanningPoker
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            string exeFolder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            string webFolder = Path.Combine(exeFolder, "assets");

            var fileSystem = new PhysicalFileSystem(webFolder);
            var options = new FileServerOptions
            {
                FileSystem = fileSystem
            };

            app.UseFileServer(options);
            app.MapSignalR();
        }
    }
}