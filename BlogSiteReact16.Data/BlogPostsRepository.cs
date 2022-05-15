using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogSiteReact16.Data
{
    public class BlogPostsRepository
    {
        private string _connString;

        public BlogPostsRepository(string connString)
        {
            _connString = connString;
        }

        public List<BlogPost> GetAll(int skip, int take)
        {
            using var context = new BlogPostsDataContext(_connString);
            return context.BlogPosts.Include(bp => bp.Comments).OrderByDescending(bp => bp.DateCreated).Skip(skip).Take(take).ToList();
        }

        public void AddBlogPost(BlogPost blogPost)
        {
            using var context = new BlogPostsDataContext(_connString);
            context.BlogPosts.Add(blogPost);
            context.SaveChanges();
        }

        public BlogPost GetBlogPost(int id)
        {
            using var context = new BlogPostsDataContext(_connString);
            return context.BlogPosts.Include(bp => bp.Comments).FirstOrDefault(bp => bp.Id == id);
        }

        public void AddComment(Comment comment)
        {
            using var context = new BlogPostsDataContext(_connString);
            comment.DateCreated = DateTime.Now;
            context.Comments.Add(comment);
            context.SaveChanges();
        }

        public List<Comment> GetComments(int blogPostId)
        {
            using var context = new BlogPostsDataContext(_connString);
            return context.Comments.Where(c => c.BlogPostId == blogPostId).ToList();
        }

        public int GetMostRecentBlogPost()
        {
            using var context = new BlogPostsDataContext(_connString);
            return context.BlogPosts.OrderByDescending(bp => bp.DateCreated).First().Id;
        }

        public int GetTotalBlogPosts()
        {
            using var context = new BlogPostsDataContext(_connString);
            return context.BlogPosts.Count();
        }
    }
}
