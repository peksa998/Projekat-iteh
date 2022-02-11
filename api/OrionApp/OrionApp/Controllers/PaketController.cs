using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrionApp.Models;
using System.Data;
using System.Data.SqlClient;

namespace OrionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaketController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public PaketController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select PaketID, NazivPaketa, OpisPaketa, Cena, Kategorija from
                            Paket
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand=new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Paket pak)
        {
            string query = @"
                           insert into dbo.Paket
                           (NazivPaketa,OpisPaketa,Cena,Kategorija)
                           values (@NazivPaketa,@OpisPaketa,@Cena,@Kategorija)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@NazivPaketa", pak.NazivPaketa);
                    myCommand.Parameters.AddWithValue("@OpisPaketa", pak.OpisPaketa);
                    myCommand.Parameters.AddWithValue("@Cena", pak.Cena);
                    myCommand.Parameters.AddWithValue("@Kategorija", pak.Kategorija);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Paket pak)
        {
            string query = @"
                           update dbo.Paket
                           set NazivPaketa= @NazivPaketa,
                            OpisPaketa=@OpisPaketa,
                            Cena=@Cena,
                            Kategorija=@Kategorija
                            where PaketID=@PaketID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PaketID", pak.PaketID);
                    myCommand.Parameters.AddWithValue("@NazivPaketa", pak.NazivPaketa);
                    myCommand.Parameters.AddWithValue("@OpisPaketa", pak.OpisPaketa);
                    myCommand.Parameters.AddWithValue("@Cena", pak.Cena);
                    myCommand.Parameters.AddWithValue("@Kategorija", pak.Kategorija);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Update Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                          delete from dbo.Paket
                            where PaketID=@PaketID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PaketID", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}
