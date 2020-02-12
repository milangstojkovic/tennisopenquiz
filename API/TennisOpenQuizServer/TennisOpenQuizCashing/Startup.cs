using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TennisOpenQuizCashing.Hubs;
using TennisOpenQuizCashing.PublishSubscribeServices;
using TennisOpenQuizCashing.RedisServices;

namespace TennisOpenQuizCashing
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSingleton<RedisService>();
            services.AddSingleton<AnswerService>();
            services.AddSingleton<GameService>();
            services.AddSingleton<QuestionAnswerService>();
            services.AddSingleton<QuestionService>();
            services.AddSingleton<SetService>();
            services.AddSingleton<StatisticService>();
            services.AddSingleton<WinnerService>();
            services.AddSingleton<ServiceRedis>();
            services.AddSingleton<PublishService>();
            services.AddSingleton<SubscribeService>();
            services.AddSingleton<BreakPtService>();


            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));
            services.AddSignalR();
            services.AddCors(o => o.AddPolicy("CorsPolicySignalR", builder =>
            {
                builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithOrigins("http://locahost:3000");
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
                            IWebHostEnvironment env,
                            ServiceRedis redisService)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            redisService.Connect();

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("MyPolicy");
            app.UseCors("CorsPolicySignalR");
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<QAHub>("qahub");
            });
            app.UseDefaultFiles();
            app.UseStaticFiles();

            
        }
    }
}
