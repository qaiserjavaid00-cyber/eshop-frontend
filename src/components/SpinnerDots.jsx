import React from "react";

export const SpinnerDots = () => {
    const dots = Array.from({ length: 8 });

    return (
        <div className="relative w-16 h-16 animate-spin-slow">
            <style>{`
        @keyframes dotFade {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .dot {
          animation: dotFade 1.2s infinite ease-in-out;
        }
        ${dots
                    .map(
                        (_, i) =>
                            `.dot:nth-child(${i + 1}) { animation-delay: ${i * 0.1}s; }`
                    )
                    .join("\n")}
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(720deg); }
          100% { transform: rotate(1440deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2.5s linear infinite;
        }
      `}</style>

            {dots.map((_, i) => (
                <div
                    key={i}
                    className="dot absolute w-2 h-2 bg-blue-500 rounded-full"
                    style={{
                        transform: `rotate(${i * 45}deg) translateY(-28px)`,
                        transformOrigin: "center center",
                    }}
                />
            ))}
        </div>
    );
};
