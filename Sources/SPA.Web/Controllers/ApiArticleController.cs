using EPiServer;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using SPA.Web.Models.Pages;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace SPA.Web.Controllers
{
    [RoutePrefix("articleapi")]
    public class ApiArticleController : ApiController
    {
        private readonly IContentLoader _contentLoader = ServiceLocator.Current.GetInstance<IContentLoader>();

        [HttpGet, Route("article/toc")]
        public async Task<IHttpActionResult> GetArticleIndex()
        {
            var cref = _contentLoader.Get<StartPage>(ContentReference.StartPage).NewsIndexPage;
            var articles = Enumerable.Empty<object>();

            articles = _contentLoader.GetChildren<ArticlePage>(cref).Select(item => new
            {
                Headline = item.Headline,
                Thumbnail = item.Thumbnail,
                DateTime = item.DateTime
            });

            if (articles.Any()) return this.Ok(articles);
            else return this.NotFound();
        }

        [HttpGet, Route("articles")]
        public async Task<IHttpActionResult> GetArticles(int skip = 0, int take = -1)
        {
            var cref = _contentLoader.Get<StartPage>(ContentReference.StartPage).NewsIndexPage;
            var articles = Enumerable.Empty<ArticlePage>();

            if (take < 0)
            {
                articles = _contentLoader.GetChildren<ArticlePage>(cref);
            }
            else
            {
                articles = _contentLoader.GetChildren<ArticlePage>(cref).Skip(skip).Take(take);
            }

            return this.Ok(articles);
        }
    }
}