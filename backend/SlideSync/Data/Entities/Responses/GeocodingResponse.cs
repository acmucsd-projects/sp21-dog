namespace SlideSync.Data.Entities.Responses {
    public class GeocodingResponse {
        public Feature[] Features { get; set; }
    }

    public class Feature {
        public string Text { get; set; }
        public Properties Properties { get; set; }
    }

    public class Properties {
        public string Address { get; set; }
        public string Category { get; set; }
    }
}