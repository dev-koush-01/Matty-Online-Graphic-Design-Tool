import React, { useRef } from "react";
import { animated, useSpring, useTransition, config } from "@react-spring/web";
import { useScroll } from "@use-gesture/react";
const mockProjects = [
  {
    id: 1,
    thumbnail: "https://picsum.photos/id/1015/600/400", // Scenic
    title: "Mountain Landscape"
  },
  {
    id: 2,
    thumbnail: "https://picsum.photos/id/1025/600/400", // Animal
    title: "Golden Retriever"
  },
  {
    id: 3,
    thumbnail: "https://picsum.photos/id/1041/600/400", // Architecture
    title: "Modern Building"
  },
  {
    id: 4,
    thumbnail: "https://picsum.photos/id/1059/600/400", // Nature
    title: "Forest Path"
  },
  {
    id: 5,
    thumbnail: "https://picsum.photos/id/1062/600/400", // Travel
    title: "Beach Sunset"
  }
];

const clamp = (value, clampAt = 30) => {
  if (value > 0) return value > clampAt ? clampAt : value;
  return value < -clampAt ? -clampAt : value;
};

export default function HistorySection({ projects = mockProjects }) {
  const scrollRef = useRef(null);

  // Spring tilt animation for cards
  const [style, api] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)"
  }));

  // Animation for empty state
  const emptyStateAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.gentle
  });

  // Transition animation for projects
  const transitions = useTransition(projects, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.8)' },
    trail: 100,
    config: config.wobbly
  });

  // Bind gesture for smooth tilt (desktop only)
  const bind = useScroll((event) => {
    if (window.innerWidth > 768) { // Only apply tilt on desktop
      api.start({
        transform: `perspective(500px) rotateY(${
          event.scrolling ? clamp(event.delta[0]) : 0
        }deg)`
      });
    }
  });

  // Mobile-friendly horizontal scroll
  const handleWheel = (e) => {
    if (scrollRef.current) {
      // Prevent vertical scroll on touch devices
      if (window.innerWidth <= 768) {
        e.preventDefault();
      }
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section className="mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
        ⏳ Recent Projects
      </h2>
      
      {projects.length === 0 ? (
        <animated.div 
          style={emptyStateAnimation}
          className="text-gray-500 dark:text-gray-400 italic py-6 text-center rounded-lg bg-gray-50 dark:bg-gray-800"
        >
          <p className="text-sm sm:text-base">No projects to display yet.</p>
          <p className="text-xs sm:text-sm mt-1">Check back later or create a new project!</p>
        </animated.div>
      ) : (
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="relative"
        >
          {/* Mobile scroll hint */}
          <div className="md:hidden absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
          
          <div
            className="flex gap-3 sm:gap-4 overflow-x-auto whitespace-nowrap pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: 'thin' }}
            {...bind()}
          >
            {transitions((style, project) => (
              <animated.div
                key={project.id}
                style={style}
                className="flex-shrink-0 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-300"
              >
                <animated.div
                  className="w-[240px] h-[160px] sm:w-[280px] sm:h-[180px] md:w-[300px] md:h-[200px] rounded-xl"
                  style={{
                    backgroundImage: `url(${project.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                />
                <div className="p-3 whitespace-normal">
                  <h3 className="text-sm sm:text-base font-medium truncate">{project.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                    {project.description}
                  </p>
                </div>
              </animated.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}