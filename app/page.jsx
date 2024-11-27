import Navbar from "../components/layout/navbar.jsx";
import Hero from "../components/layout/hero.jsx";
import Footer from "../components/layout/footer.jsx";
import BlogNavbar from "../components/blog/blogNavbar.jsx";
import BlogTabs from "../components/blog/blogTabs.jsx";
import BlogCard from "../components/blog/blogCard.jsx";
import { SignedIn, SignedOut } from '@clerk/nextjs';

function SignedOutView() {
  return (
    <>
      <Navbar />
      <div className="flex-grow">
        <Hero
          title="Welcome to My Blog!"
          description="Sharing insights, stories, and experiences on technology, coding, and life."
          imageSrc="/hero.png"
        />
      </div>
      <Footer />
    </>
  );
}

function SignedInView() {
  return (
    <>
      <BlogNavbar />
      <div className="mx-auto max-w-screen-xl container mb-6">
        <BlogTabs />
        <BlogCard />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SignedOut>
        <SignedOutView />
      </SignedOut>

      <SignedIn>
        <SignedInView />
      </SignedIn>
    </div>
  );
}
