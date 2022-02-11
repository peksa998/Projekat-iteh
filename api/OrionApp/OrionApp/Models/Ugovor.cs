namespace OrionApp.Models
{
    public class Ugovor
    {
        public int UgovorID { get; set; }
        public string KorisnickoIme { get; set; }

        public int TrajanjeUgovora { get; set; }

        public int Popust { get; set; }

        public int GratisPeriod { get; set; }

        public string Aktivnost { get; set; }

        public string DatumPocetka { get; set; }

        public int Suma { get; set; }
    }
}
