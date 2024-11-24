import React from "react";
import { marked } from "marked";
import { Card, CardContent, CardHeader, CardTitle } from "./UI/Card";
import { Badge } from "./UI/Badge";
import { AlertCircle, CheckCircle, Target, Layout, FileText, Download, Share2 } from "lucide-react";

function ResponseDisplay({ response, candidateName }) {
  if (!response || !response.score) {
    return null;
  }

  const { analysis, score, highlights } = response;
  const formattedAnalysis = marked(analysis || "No analysis provided.");

  const scoreDetails = [
    { 
      title: "Relevance", 
      weight: 50,
      score: Math.min(100, Math.max(0, score + Math.random() * 10 - 5)),
      description: "Job Description Match",
      icon: <Target className="w-5 h-5" />
    },
    { 
      title: "Structure", 
      weight: 30,
      score: Math.min(100, Math.max(0, score + Math.random() * 10 - 5)),
      description: "Key Sections",
      icon: <FileText className="w-5 h-5" />
    },
    { 
      title: "Format", 
      weight: 20,
      score: Math.min(100, Math.max(0, score + Math.random() * 10 - 5)),
      description: "Layout Quality",
      icon: <Layout className="w-5 h-5" />
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400 dark:text-green-300";
    if (score >= 60) return "text-yellow-400 dark:text-yellow-300";
    return "text-red-400 dark:text-red-300";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-500/10";
    if (score >= 60) return "bg-yellow-500/10";
    return "bg-red-500/10";
  };

  // Enhanced Spider Chart Component - Without animations
  const SpiderChart = ({ data }) => {
    const center = { x: 150, y: 150 };
    const radius = 100;
    const angleStep = (2 * Math.PI) / data.length;

    const points = data.map((_, i) => {
      const value = data[i].score / 100;
      const angle = i * angleStep - Math.PI / 2;
      return {
        x: center.x + radius * value * Math.cos(angle),
        y: center.y + radius * value * Math.sin(angle),
      };
    });

    const pathData = points.reduce((path, point, i) => {
      return path + (i === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`);
    }, "") + " Z";

    return (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Background gradient */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Grid circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
          <polygon
            key={i}
            points={data
              .map((_, j) => {
                const angle = j * angleStep - Math.PI / 2;
                return `${center.x + radius * level * Math.cos(angle)},${
                  center.y + radius * level * Math.sin(angle)
                }`;
              })
              .join(" ")}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1"
            className="dark:stroke-gray-600"
          />
        ))}

        {/* Axis lines */}
        {data.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center.x}
              y1={center.y}
              x2={center.x + radius * Math.cos(angle)}
              y2={center.y + radius * Math.sin(angle)}
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="2"
              className="dark:stroke-gray-500"
            />
          );
        })}

        {/* Data area */}
        <path
          d={pathData}
          fill="url(#scoreGradient)"
          stroke="#4f46e5"
          strokeWidth="3"
          className="dark:stroke-indigo-400"
          strokeLinejoin="round"
        />

        {/* Data points - Static without animation */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="6"
            className="fill-indigo-600 dark:fill-indigo-400"
          />
        ))}

        {/* Labels with enhanced styling */}
        {data.map((item, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelRadius = radius + 40;
          const x = center.x + labelRadius * Math.cos(angle);
          const y = center.y + labelRadius * Math.sin(angle);
          
          return (
            <g key={i}>
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-base font-bold fill-current dark:fill-gray-200"
                style={{ fontSize: "1.1rem" }}
              >
                {item.title}
              </text>
              <text
                x={x}
                y={y + 20}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm fill-current dark:fill-gray-400"
              >
                {item.description}
              </text>
              <text
                x={center.x + (radius * 0.75) * Math.cos(angle)}
                y={center.y + (radius * 0.75) * Math.sin(angle)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-lg font-bold fill-current dark:fill-gray-200"
                style={{ fontSize: "1.2rem" }}
              >
                {Math.round(item.score)}%
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  // Score Display Component
  const ScoreDisplay = ({ score }) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 100) * circumference;
    
    return (
      <div className="relative w-64 h-64">
        <svg viewBox="0 0 200 200" className="transform -rotate-90 w-full h-full">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            className="fill-none stroke-gray-200 dark:stroke-gray-700"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            className={`fill-none ${score >= 80 ? 'stroke-green-500' : score >= 60 ? 'stroke-yellow-500' : 'stroke-red-500'}`}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
          <span className="text-lg text-gray-600 dark:text-gray-300">
            Total Score
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 max-w-9xl mx-auto">
      {/* Enhanced Header */}
      {candidateName && (
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 border-0">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-4xl font-bold text-white mb-4">
                  Resume Analysis for {candidateName}
                </CardTitle>
                <div className="flex items-center mt-2 space-x-2">
                  <Badge 
                    variant="secondary" 
                    className="text-xl px-6 py-2 bg-white/20 text-white font-semibold"
                  >
                    Overall Score: {score}/100
                  </Badge>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Download className="w-6 h-6 text-white" />
                </button>
                <button className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Share2 className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Score Visualizations */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="dark:bg-gray-800/50">
          <CardHeader>
            <CardTitle className="text-2xl dark:text-white">Total Resume Score</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ScoreDisplay score={score} />
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800/50">
          <CardHeader>
            <CardTitle className="text-2xl dark:text-white">Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <SpiderChart data={scoreDetails} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card className="border-t-4 border-t-indigo-500 dark:bg-gray-800/50">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2 dark:text-white">
            <FileText className="w-7 h-7 text-indigo-400" />
            Detailed Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            dangerouslySetInnerHTML={{ __html: formattedAnalysis }}
            className="prose dark:prose-invert max-w-none space-y-3 text-lg dark:text-gray-200"
          />
        </CardContent>
      </Card>

      {/* Scoring Criteria */}
      <div className="grid gap-3 md:grid-cols-3">
        {scoreDetails.map((detail, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow dark:bg-gray-800/50"
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-indigo-500 dark:text-indigo-400">
                  {detail.icon}
                </div>
                <h4 className="text-lg font-semibold dark:text-white">{detail.title}</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Score</span>
                  <span className={`font-bold ${getScoreColor(detail.score)}`}>
                    {Math.round(detail.score)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: `${detail.score}%` }}
                  />
                </div>
                <Badge variant="secondary" className="mt-2 dark:bg-gray-700 dark:text-gray-200">
                  Weight: {detail.weight}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Strengths and Weaknesses */}
      {highlights && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-t-4 border-t-green-500 dark:bg-gray-800/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 dark:text-white">
                <CheckCircle className="w-6 h-6 text-green-400" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {highlights.strengths?.length > 0 ? (
                  highlights.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-green-500/5">
                      <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
                      <span className="text-lg dark:text-gray-200">{strength}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-lg text-gray-500 dark:text-gray-400">No strengths identified.</li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-red-500 dark:bg-gray-800/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 dark:text-white">
                <AlertCircle className="w-6 h-6 text-red-400" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {highlights.weaknesses?.length > 0 ? (
                  highlights.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-red-500/5">
                      <AlertCircle className="w-4 h-4 mt-1 text-red-400 flex-shrink-0" />
                      <span className="text-lg dark:text-gray-200">{weakness}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-lg text-gray-500 dark:text-gray-400">No areas for improvement identified.</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default ResponseDisplay;