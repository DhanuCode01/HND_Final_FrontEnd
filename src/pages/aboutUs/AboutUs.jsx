import React from "react";
import Mission from "./Mission.jpg"
import Team from "./Team.jpg"

export default function AboutUs() {
  return (
    <div className="font-['Roboto']">
      {/* Banner */}
      <section className="w-full bg-gradient-to-r from-primary to-accent text-white py-16 shadow-md">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover our mission, vision, and what drives us to serve your fashion needs.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-gray-400">
        {/* Who We Are */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-3 text-white">Who We Are</h2>
            <p className="text-sm leading-relaxed">
              We are a passionate team dedicated to curating the best fashion products for men, women, and kids. 
              Our goal is to make fashion accessible, stylish, and affordable for everyone. 
              Whether you're looking for everyday wear or a standout piece for a special occasion, we've got you covered.
            </p>
          </div>
          <img src={Team} alt="Team" className="rounded-xl shadow-lg w-full h-auto object-cover" />
        </div>

        {/* Our Mission */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img src={Mission} alt="Mission" className="rounded-xl shadow-lg w-full h-auto object-cover" />
          <div>
            <h2 className="text-3xl font-semibold mb-3 text-white">Our Mission</h2>
            <p className="text-sm leading-relaxed">
              Our mission is to deliver high-quality fashion with top-notch customer service. 
              We believe everyone deserves to feel confident in what they wear. 
              Through constant innovation and customer feedback, we aim to grow into your favorite online fashion destination.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-3 text-white">Why Choose Us</h2>
          <ul className="grid md:grid-cols-3 gap-6 mt-6 text-sm">
            <li className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-white mb-2">Wide Selection</h4>
              <p>From basics to trendy, we have something for every style and need.</p>
            </li>
            <li className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-white mb-2">Affordable Pricing</h4>
              <p>High-quality items at prices that won't break the bank.</p>
            </li>
            <li className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-white mb-2">Customer First</h4>
              <p>We’re here for you 24/7 to make sure your shopping experience is smooth.</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
