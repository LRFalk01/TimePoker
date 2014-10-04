using System;
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
#if DEBUG
            var fileSystem = new PhysicalFileSystem("../../assets");
#endif
#if !DEBUG
            var fileSystem = new PhysicalFileSystem("./assets");
#endif
            var options = new FileServerOptions
            {
                FileSystem = fileSystem
            };

            app.UseFileServer(options);
            app.MapSignalR();
        }
    }
}