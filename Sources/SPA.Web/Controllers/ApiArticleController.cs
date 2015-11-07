using EPiServer;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using SPA.Web.Models.Pages;
using System.Threading.Tasks;
using System.Web.Http;

namespace SPA.Web.Controllers
{
    [RoutePrefix("articleapi")]
    public class ApiArticleController : ApiController
    {
        private readonly IContentLoader _contentLoader = ServiceLocator.Current.GetInstance<IContentLoader>();

        [HttpGet, Route("articles")]
        public async Task<IHttpActionResult> GetArticles()
        {
            var cref = _contentLoader.Get<StartPage>(ContentReference.StartPage).NewsIndexPage;
            var articles = _contentLoader.GetChildren<ArticlePage>(cref);

            return this.Ok(articles);
        }
    }
}