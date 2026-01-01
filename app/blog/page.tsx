"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/portfolio/Navbar";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  authorName: string;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blog?page=${currentPage}&limit=${postsPerPage}`);
        const data = await res.json();
        setPosts(data.posts);
        setTotalPages(data.pagination.pages);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  const paginate = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-32 pb-20 bg-white border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Insights & <span className="text-blue-600">Innovation</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Exploring the intersection of web development, AI, and modern technology.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post._id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden rounded-3xl bg-white">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-blue-600 hover:bg-white border-none font-black px-4 py-2 rounded-xl backdrop-blur-md">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4 font-bold">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.authorName}
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-black mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <p className="text-gray-500 mb-8 line-clamp-3 font-medium leading-relaxed">
                      {post.excerpt}
                    </p>
                    <Button asChild variant="ghost" className="p-0 font-black text-blue-600 hover:text-blue-700 hover:bg-transparent group/btn">
                      <Link href={`/blog/${post._id}`} className="flex items-center gap-2">
                        Read More <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-20">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-14 h-14 rounded-2xl border-2 border-gray-200 hover:bg-gray-900 hover:text-white transition-all disabled:opacity-30"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <div className="flex gap-3">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`w-14 h-14 rounded-2xl font-black text-lg transition-all ${
                        currentPage === page 
                          ? "bg-blue-600 text-white shadow-xl shadow-blue-100" 
                          : "bg-white border-2 border-gray-100 text-gray-400 hover:border-gray-900 hover:text-gray-900"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-14 h-14 rounded-2xl border-2 border-gray-200 hover:bg-gray-900 hover:text-white transition-all disabled:opacity-30"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
