using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Owin.Hosting;

namespace PlanningPoker
{
    class Program
    {
        static void Main(string[] args)
        {

#if DEBUG
            var url = "http://+:8080/";
#endif
#if !DEBUG
            var url = "http://*:8888";
#endif
            using (WebApp.Start<Startup>(url))
            {
                Console.WriteLine("Server running at " + url);
                Console.ReadLine();
            }
        }
    }
}
