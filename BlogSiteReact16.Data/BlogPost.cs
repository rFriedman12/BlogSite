using System;
using System.Collections.Generic;

namespace BlogSiteReact16.Data
{
    public class BlogPost
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTime DateCreated { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
