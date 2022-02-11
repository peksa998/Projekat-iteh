using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrionApp.Models;
using System.Data;
using System.Data.SqlClient;

namespace OrionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaketZaUgovorController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public PaketZaUgovorController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select rb, PaketID, UgovorID from
                            PaketZaUgovor
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
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
        public JsonResult Post(PaketZaUgovor pzu)
        {
            string query = @"
                           insert into dbo.PaketZaUgovor
                           (PaketID, UgovorID)
                           values (@PaketID, @UgovorID)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PaketID", pzu.PaketID);
                    myCommand.Parameters.AddWithValue("@UgovorID", pzu.UgovorID);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(PaketZaUgovor pzu)
        {
            string query = @"
                           update dbo.PaketZaUgovor
                           set PaketID= @PaketID,
                            UgovorID=@UgovorID
                            where rb=@rb
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@rb", pzu.rb);
                    myCommand.Parameters.AddWithValue("@PaketID", pzu.PaketID);
                    myCommand.Parameters.AddWithValue("@UgovorID", pzu.UgovorID);
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
                          delete from dbo.PaketZaUgovor
                            where rb=@rb
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@rb", id);
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
