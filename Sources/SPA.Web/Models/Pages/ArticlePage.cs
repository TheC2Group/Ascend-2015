using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Web;
using System;
using System.ComponentModel.DataAnnotations;

namespace SPA.Web.Models.Pages
{
    [ContentType(DisplayName = "Article", GUID = "d5598b4a-1b9e-4d95-bd9a-c4830085e905", Description = "")]
    public class ArticlePage : PageData
    {
        [CultureSpecific]
        public virtual String Headline { get; set; }

        [CultureSpecific]
        public virtual String Author { get; set; }
        
        [CultureSpecific]
        [UIHint(UIHint.Image)]
        public virtual Url Thumbnail { get; set; }

        [CultureSpecific]
        [UIHint(UIHint.Image)]
        public virtual Url Image { get; set; }

        public virtual DateTime DateTime { get; set; }


        [CultureSpecific]
        public virtual XhtmlString MainBody { get; set; }
    }
}