using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrionApp.Models;
using System.Data;
using System.Data.SqlClient;

namespace OrionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UgovorController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public UgovorController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select UgovorID, KorisnickoIme, TrajanjeUgovora, Popust, GratisPeriod,
                            Aktivnost, convert(varchar(19), DatumPocetka, 120) as DatumPocetka, Suma from
                            Ugovor
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
        public JsonResult Post(Ugovor ugo)
        {
            string query = @"
                           insert into dbo.Ugovor
                           (KorisnickoIme,TrajanjeUgovora,Popust,GratisPeriod,Aktivnost,DatumPocetka,Suma)
                           values (@KorisnickoIme,@TrajanjeUgovora,@Popust,@GratisPeriod,@Aktivnost,@DatumPocetka,@Suma)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@KorisnickoIme", ugo.KorisnickoIme);
                    myCommand.Parameters.AddWithValue("@TrajanjeUgovora", ugo.TrajanjeUgovora);
                    myCommand.Parameters.AddWithValue("@Popust", ugo.Popust);
                    myCommand.Parameters.AddWithValue("@GratisPeriod", ugo.GratisPeriod);
                    myCommand.Parameters.AddWithValue("@Aktivnost", ugo.Aktivnost);
                    myCommand.Parameters.AddWithValue("@DatumPocetka", ugo.DatumPocetka);
                    myCommand.Parameters.AddWithValue("@Suma", ugo.Suma);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Ugovor ugo)
        {
            string query = @"
                           update dbo.Ugovor
                           set KorisnickoIme= @KorisnickoIme,
                            TrajanjeUgovora=@TrajanjeUgovora,
                            Popust=@Popust,
                            GratisPeriod=@GratisPeriod,
                            Aktivnost=@Aktivnost,
                            DatumPocetka=@DatumPocetka,
                            Suma=@Suma
                            where UgovorID=@UgovorID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UgovorID", ugo.UgovorID);
                    myCommand.Parameters.AddWithValue("@KorisnickoIme", ugo.KorisnickoIme);
                    myCommand.Parameters.AddWithValue("@TrajanjeUgovora", ugo.TrajanjeUgovora);
                    myCommand.Parameters.AddWithValue("@Popust", ugo.Popust);
                    myCommand.Parameters.AddWithValue("@GratisPeriod", ugo.GratisPeriod);
                    myCommand.Parameters.AddWithValue("@Aktivnost", ugo.Aktivnost);
                    myCommand.Parameters.AddWithValue("@DatumPocetka", ugo.DatumPocetka);
                    myCommand.Parameters.AddWithValue("@Suma", ugo.Suma);
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
                          delete from dbo.Ugovor
                            where UgovorID=@UgovorID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UgovorID", id);
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
