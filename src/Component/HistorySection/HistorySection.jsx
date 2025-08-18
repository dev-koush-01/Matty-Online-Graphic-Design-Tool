import React, { useRef } from "react";
import { animated, useSpring, useTransition, config } from "@react-spring/web";
import { useScroll } from "@use-gesture/react";

const clamp = (value, clampAt = 30) => {
  if (value > 0) return value > clampAt ? clampAt : value;
  return value < -clampAt ? -clampAt : value;
};

export default function HistorySection({ projects = [], onProjectClick }) {
  const scrollRef = useRef(null);

  // Tilt animation
  const [tiltStyle, api] = useSpring(() => ({ transform: "perspective(500px) rotateY(0deg)" }));

  // Transition animation
  const transitions = useTransition(projects, {
    keys: project => project.id,
    from: { opacity: 0, transform: 'scale(0.9)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.8)' },
    trail: 100,
    config: config.wobbly
  });

  // Desktop tilt gesture
  const bind = useScroll((event) => {
    if (window.innerWidth > 768) {
      api.start({
        transform: `perspective(500px) rotateY(${event.scrolling ? clamp(event.delta[0]) : 0}deg)`
      });
    }
  });

  // Mobile horizontal scroll
  const handleWheel = (e) => {
    if (scrollRef.current) {
      if (window.innerWidth <= 768) e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section className="mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
        ⏳ Recent Projects
      </h2>

      {projects.length === 0 ? (
        <p className="text-gray-500 italic py-6 text-center rounded-lg bg-gray-50 dark:bg-gray-800">
          No projects to display yet.
        </p>
      ) : (
        <div ref={scrollRef} onWheel={handleWheel} className="relative">
          <div
            className="flex gap-3 sm:gap-4 overflow-x-auto whitespace-nowrap pb-4 -mx-4 px-4"
            {...bind()}
          >
            {transitions((style, project) => {
              if (!project) return null;
              return (
                <animated.div
                  key={project.id}
                  style={style}
                  className="flex-shrink-0 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => onProjectClick && onProjectClick(project)}
                >
                  <animated.div
                    className="w-[240px] h-[160px] sm:w-[280px] sm:h-[180px] md:w-[300px] md:h-[200px] rounded-xl bg-gray-100 flex items-center justify-center text-gray-400"
                    style={{
                      ...tiltStyle,
                      backgroundImage: project.thumbnail ? `url(${project.thumbnail})` : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  >
                    {!project.thumbnail && "No Thumbnail"}
                  </animated.div>
                  <div className="p-3 whitespace-normal">
                    <h3 className="text-sm sm:text-base font-medium truncate">{project.name || "Untitled Project"}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                      {project.description || "No description"}
                    </p>
                  </div>
                </animated.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
