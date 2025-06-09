import React from "react";
import { Link } from "react-router-dom";

export default function AboutMe() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Me</h1>

        <p className="mb-4 leading-relaxed">
          Hi there! I’m Vedant Sood, a passionate photographer with an eye for capturing life’s most beautiful, fleeting moments. From the intricate play of light to the raw, unfiltered emotions of human connection, photography has always been my way of seeing the world through a different lens. It’s more than just a hobby for me – it’s a way to freeze time, tell stories, and share my unique perspective with others.
        </p>

        <p className="mb-4 leading-relaxed">
          I began my photography journey several years ago, experimenting with different styles and techniques. Over time, I’ve honed my skills in portrait, landscape, and street photography, but I’m always open to new challenges and creative exploration. Whether I’m behind the lens or behind the scenes, I believe that the most meaningful images come from a genuine connection with the subject, a true understanding of light, and an intuitive approach to composition.
        </p>
        
        <p className="mb-4 leading-relaxed">
          When I’m not photographing, you’ll likely find me immersed in the latest photography trends, attending workshops, or exploring new places to expand my creative horizons. I believe in constantly learning and evolving, and I’m always eager to share my knowledge with fellow photography enthusiasts.
        </p>
        
        <p className="mb-4 leading-relaxed">
          This website is where I showcase my work, share photography tips and techniques, and document the stories I capture through my lens. I hope that my images inspire you, evoke emotion, or simply offer a new way of seeing the world.
        </p>

        <p className="mb-4 leading-relaxed">
          Thanks for stopping by, and I invite you to explore my gallery and connect with me!
        </p>

        <Link
          to="/"
          className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Back to Gallery
        </Link>
      </div>
    </main>
  );
}
