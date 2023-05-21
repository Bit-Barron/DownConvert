import { useEffect, useMemo } from "react";
import { ImageStore } from "../../store/ImageStore";
import useMeasure from "react-use-measure";
import useMedia from "../../useMedia";
import { a, useTransition } from "@react-spring/web";
import styles from "./styles.module.css";
import shuffle from "lodash.shuffle";
import { VideoStore } from "../../store/VideoStore";

export const ImageMasonry: React.FC = () => {
  const { video, setVideo } = VideoStore();

  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [5, 4, 3],
    2
  );

  const [ref, { width }] = useMeasure();

  useEffect(() => {
    setVideo(shuffle(video));
  }, []);

  const [heights, gridItems] = useMemo(() => {
    const heights = new Array(columns).fill(0);
    const gridItems = video.map((child) => {
      const column = heights.indexOf(Math.min(...heights));
      const x = (width / columns) * column;
      const y = (heights[column] += child.height / 2) - child.height / 2;
      return {
        ...child,
        x,
        y,
        width: width / columns,
        height: child.height / 2,
      };
    });
    return [heights, gridItems];
  }, [columns, width]);

  const transitions = useTransition(gridItems, {
    key: (item: { css: string; height: number }) => item.css,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });
  return (
    <div
      ref={ref}
      className={styles.list}
      style={{ height: Math.max(...heights) }}
    >
      {transitions((style, item) => (
        <a.div style={style}>
          <div
            onClick={() => setVideo(item)}
            style={{
              backgroundImage: `url(${item.url}?auto=compress&dpr=2&h=500&w=500)`,
            }}
            className={""}
          />
        </a.div>
      ))}
    </div>
  );
};
