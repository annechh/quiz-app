interface ConfettiPiece {
  left: string;
  animationDelay: string;
  animationDuration: string;
  width: string;
  height: string;
  backgroundColor: string;
  innerAnimationDuration: string;
  innerAnimationDelay: string;
}

interface ConfettiProps {
  count?: number;
}

export default function Confetti({ count = 72 }: ConfettiProps) {
  const confettiPieces: ConfettiPiece[] = Array.from(
    { length: count },
    (_, index) => {
      const fallDuration = 7 + (index % 11) * 0.6;
      const shimmerDuration = 2.2 + (index % 7) * 0.25;
      const spinDuration = 6 + (index % 9) * 0.8;

      return {
        left: `${(index * 37) % 100}%`,
        animationDelay: `-${(index % 12) * 0.7}s, -${(index % 8) * 0.35}s`,
        animationDuration: `${fallDuration}s, ${shimmerDuration}s`,
        width: `${6 + (index % 4) * 2}px`,
        height: `${10 + (index % 5) * 2}px`,
        backgroundColor: `hsl(${(index * 47) % 360} 90% 60%)`,
        innerAnimationDuration: `${spinDuration}s`,
        innerAnimationDelay: `-${(index % 10) * 0.5}s`,
      };
    },
  );

  return (
    <div className="confetti-overlay" aria-hidden="true">
      {confettiPieces.map((piece, index) => (
        <span
          key={index}
          className="confetti-piece"
          style={{
            left: piece.left,
            animationDelay: piece.animationDelay,
            animationDuration: piece.animationDuration,
          }}
        >
          <span
            className="confetti-inner"
            style={{
              width: piece.width,
              height: piece.height,
              backgroundColor: piece.backgroundColor,
              animationDuration: piece.innerAnimationDuration,
              animationDelay: piece.innerAnimationDelay,
            }}
          />
        </span>
      ))}
    </div>
  );
}
