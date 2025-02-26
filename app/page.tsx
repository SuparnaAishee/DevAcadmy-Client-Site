import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseSection from "@/components/CourseSection";
import HeroSection from "@/components/HeroSection";
import { Code2, Palette, Terminal, Brain } from "lucide-react"; // Added appropriate icons

import FeaturedCourseSection from "@/components/FeaturedCourseSection";
import WhyChooseUsSection from "@/components/sections/whyChooseUs";
import ReviewSection from "@/components/sections/ReviewSection";
import Footer from "@/components/Footer";
import WhyChooseUsEnhanced from "@/components/sections/whyChooseUs";
import Features from "@/components/sections/featured";
import TechStack from "@/components/sections/techStack";
import StatsSection from "@/components/sections/StatsSection";
import ImpactStats from "@/components/sections/imapctStats";

export default function Home() {
  return (
    <main>
      <div className="bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent">
        <HeroSection />
      </div>
      <section className="">
        <div className="container mx-auto px-4">
          {/* Featured Courses Section */}
          <div className="mb-20 pl-12 pr-12">
            <FeaturedCourseSection />
          </div>

          {/* All Courses Section */}
          <h2 className="text-4xl font-bold text-center mb-12 ">
            Explore All Courses_
          </h2>
          <Tabs defaultValue="development" className="w-full ">
            <TabsList className="flex justify-center mb-8 bg-indigo-50">
              <TabsTrigger
                value="development"
                className="flex items-center gap-2"
              >
                <Code2 className="h-4 w-4" />
                Development
              </TabsTrigger>
              <TabsTrigger value="design" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Design
              </TabsTrigger>
              <TabsTrigger
                value="programming"
                className="flex items-center gap-2"
              >
                <Terminal className="h-4 w-4" />
                Programming
              </TabsTrigger>
              <TabsTrigger
                value="machine-learning"
                className="flex items-center gap-2"
              >
                <Brain className="h-4 w-4" />
                Machine Learning
              </TabsTrigger>
            </TabsList>

            <TabsContent value="development">
              <CourseSection
                category="development"
                showOnlyFeatured={false}
                limit={4}
              />
            </TabsContent>
            <TabsContent value="design">
              <CourseSection
                category="design"
                showOnlyFeatured={false}
                limit={4}
              />
            </TabsContent>
            <TabsContent value="programming">
              <CourseSection
                category="programming"
                showOnlyFeatured={false}
                limit={4}
              />
            </TabsContent>
            <TabsContent value="machine-learning">
              <CourseSection
                category="machine-learning"
                showOnlyFeatured={false}
                limit={4}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="pt-8">
          <WhyChooseUsEnhanced />
        </div>
        <div>
          <ReviewSection />
        </div>
        <div>
          <TechStack />
        </div>

        <div>
          <StatsSection />
        </div>

        <div>
          <Footer />
        </div>
      </section>
    </main>
  );
}
