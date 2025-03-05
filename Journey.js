import React from "react";

const KutchHandicrafts = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-teal-50 px-6">
      <div className="max-w-3xl bg-teal-50 20rounded-lg p-8 text-center transition-all duration-300 hover:scale-105">
        {/* Quote Section */}
        <h2 className="text-3xl font-bold text-black mb-4">
          "Art is not a handicraft, it is the transmission of feeling the artist has experienced."
        </h2>
        <p className="text-black text-lg leading-relaxed">
          The handicrafts of Kutch are a vibrant reflection of centuries-old traditions, passed down through generations. 
          From the intricate <span className="font-semibold">Ajrakh block printing</span> to the delicate 
          <span className="font-semibold"> Lippan mirror work</span>, each craft tells a story of artistry and culture.  
          The region is home to skilled artisans specializing in <span className="font-semibold">Rogan painting, Bandhani tie-dye, silver jewelry, and embroidery</span>, 
          all deeply rooted in the heritage of Gujarat. These crafts not only preserve history but also empower local communities 
          by keeping ancient skills alive.
        </p>
      </div>
    </div>
  );
};

export default KutchHandicrafts;