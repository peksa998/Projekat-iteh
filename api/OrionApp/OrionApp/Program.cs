using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using OrionApp.Data;
using OrionApp.Helpers;

var builder = WebApplication.CreateBuilder(args);



// Add services to the container.
builder.Services.AddCors();
builder.Services.AddDbContext<UserContext>(optionsAction);
void optionsAction(DbContextOptionsBuilder obj)
{
    obj.UseSqlServer("Server=localhost;Database=OrionDB;Trusted_Connection=True");
}

builder.Services.AddControllers();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<JwtServices>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



//Enable CORS
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// JSON Serializer
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
           options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
               .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver
               = new DefaultContractResolver());


var app = builder.Build();

//Enable CORS
// app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

//Enable CORS
app.UseCors(options => options
    .WithOrigins(new[] { "http://localhost:3000" })
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseAuthorization();

app.MapControllers();

app.Run();
