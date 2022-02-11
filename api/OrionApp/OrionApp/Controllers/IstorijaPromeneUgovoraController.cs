using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrionApp.Models;
using System.Data;
using System.Data.SqlClient;

namespace OrionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IstorijaPromeneUgovoraController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public IstorijaPromeneUgovoraController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select PromenaID, convert(varchar(19), Datum, 120) as Datum, Suma, UgovorID, iuAktivan from
                            IstorijaPromeneUgovora
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
        public JsonResult Post(IstorijaPromeneUgovora ipu)
        {
            string query = @"
                           insert into dbo.IstorijaPromeneUgovora
                           (Datum,Suma,UgovorID,iuAktivan)
                           values (@Datum,@Suma,@UgovorID,@iuAktivan)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Datum", ipu.Datum);
                    myCommand.Parameters.AddWithValue("@Suma", ipu.Suma);
                    myCommand.Parameters.AddWithValue("@UgovorID", ipu.UgovorID);
                    myCommand.Parameters.AddWithValue("@iuAktivan", ipu.iuAktivan);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(IstorijaPromeneUgovora ipu)
        {
            string query = @"
                           update dbo.IstorijaPromeneUgovora
                           set Datum= @Datum,
                            Suma=@Suma,
                            UgovorID=@UgovorID,
                            iuAktivan=@iuAktivan
                            where PromenaID=@PromenaID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PromenaID", ipu.PromenaID);
                    myCommand.Parameters.AddWithValue("@Datum", ipu.Datum);
                    myCommand.Parameters.AddWithValue("@Suma", ipu.Suma);
                    myCommand.Parameters.AddWithValue("@UgovorID", ipu.UgovorID);
                    myCommand.Parameters.AddWithValue("@iuAktivan", ipu.iuAktivan);
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
                          delete from dbo.IstorijaPromeneUgovora
                            where PromenaID=@PromenaID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrionAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PromenaID", id);
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
