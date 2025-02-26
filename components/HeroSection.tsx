// import { Button } from "@/components/ui/button"
// import { ArrowRight } from "lucide-react"

// export default function HeroSection() {
//   return (
//     <section className="relative overflow-hidden absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent pt-16 pb-24">
//       <div className="container mx-auto px-4">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
//               Master New Skills with Professional Courses
//             </h1>
//             <p className="text-xl text-muted-foreground mb-8 max-w-lg">
//               Learn from industry experts and advance your career with our
//               comprehensive online courses
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button size="lg" className="font-semibold">
//                 Get Started
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button size="lg" variant="outline">
//                 Browse Courses
//               </Button>
//             </div>
//           </div>
//           <div className="relative lg:h-[600px] ">
//             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent rounded-xl" />
//             <img
//               src="https://res.cloudinary.com/dwelabpll/image/upload/v1740143752/e-learning-concept-free-vector_syiz7n-removebg-preview_joti0s.png"
//               alt="Learning platform preview"
//               className="rounded-xl shadow-2xl w-full"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent pt-16 pb-24 px-12 ">
      <div className="container mx-auto px-4 pl-8 pr-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Master New Skills with Professional Courses
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Learn from industry experts and advance your career with our
              comprehensive online courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-semibold">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Browse Courses
              </Button>
            </div>
          </div>
          <div className="relative lg:h-[500px] pt-12 ">
            <img
              src="https://res.cloudinary.com/dwelabpll/image/upload/v1740142788/e-learning-concept-free-vector_syiz7n.jpg"
              alt="Learning platform preview"
              className="rounded-xl shadow-lg w-full h-auto object-cover bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
