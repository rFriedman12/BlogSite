using BlogSiteReact16.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogSiteReact16.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private string _connString;

        public BlogPostsController(IConfiguration config)
        {
            _connString = config.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<BlogPost> GetAll(int skip)
        {
            var repo = new BlogPostsRepository(_connString);
            return repo.GetAll(skip, 3);
        }

        [HttpPost]
        [Route("post")]
        public void AddBlogPost(BlogPost blogPost)
        {
            var repo = new BlogPostsRepository(_connString);
            blogPost.DateCreated = DateTime.Now;
            repo.AddBlogPost(blogPost);
        }
        
        [Route("getpost")]
        public BlogPost GetBlogPost(int id)
        {
            var repo = new BlogPostsRepository(_connString);
            return repo.GetBlogPost(id);
        }

        [HttpPost]
        [Route("addcomment")]
        public void AddComment(Comment comment)
        {
            var repo = new BlogPostsRepository(_connString);
            repo.AddComment(comment);
        }

        [Route("getcomments")]
        public List<Comment> GetComments(int blogPostId)
        {
            var repo = new BlogPostsRepository(_connString);
            return repo.GetComments(blogPostId);
        }

        [Route("mostrecent")]
        public int GetMostRecent()
        {
            var repo = new BlogPostsRepository(_connString);
            return repo.GetMostRecentBlogPost();
        }

        [Route("totalposts")]
        public int GetTotalBlogPosts()
        {
            var repo = new BlogPostsRepository(_connString);
            return repo.GetTotalBlogPosts();
        }
    }
}
