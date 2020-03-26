import React from "react";
import "./ImageList.css";
interface Props {
  items: Gif[] | null;
}

export const ImageList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="image-list" data-testid="image-list">
      {items &&
        items.map(gif => {
          return (
            <li
              key={gif.id}
              className="image-list-item"
              data-testid="image-list-item"
            >
              <img
                alt={gif.title}
                src={gif.images.fixed_width.url}
                width={gif.images.fixed_width.width}
                height={gif.images.fixed_width.height}
              />
            </li>
          );
        })}
    </ul>
  );
};
