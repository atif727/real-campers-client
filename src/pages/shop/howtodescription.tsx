import React from "react";

interface Props {
  description: string;
}

const ProductDescription: React.FC<Props> = ({ description }) => {
  // Split the description by full stop and remove any empty strings
  const sentences = description
    .split(".")
    .filter((sentence) => sentence.trim() !== "");

  return (
    <div>
      {sentences.map((sentence, index) => (
        <h1 key={index} className="text-2xl text-left ">
          • {sentence.trim()}.
        </h1>
      ))}
    </div>
  );
};

export default ProductDescription;
