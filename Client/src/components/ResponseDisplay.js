import React from "react";
import { marked } from "marked";
import { Card, CardContent, CardHeader, CardTitle } from "./UI/Card";
import { Badge } from "./UI/Badge";
import { AlertCircle, CheckCircle, Target, Layout, FileText } from "lucide-react";

function ResponseDisplay({ response, candidateName }) {
  if (!response || !response.score) {
    return null;
  }

  const { analysis, score, highlights } = response;
  const formattedAnalysis = marked(analysis || "No analysis provided.");

  const scoreDetails = [
    { 
      title: "Relevance to Job Description", 
      weight: 50, 
      description: "How well the resume matches the job description.",
      icon: <Target className="w-5 h-5" />
    },
    { 
      title: "Inclusion of Key Sections", 
      weight: 30, 
      description: "Ensures the presence of essential sections (e.g., Skills, Experience).",
      icon: <FileText className="w-5 h-5" />
    },
    { 
      title: "Formatting Quality", 
      weight: 20, 
      description: "Evaluates bullet points, spacing, and structure.",
      icon: <Layout className="w-5 h-5" />
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400 dark:text-green-300";
    if (score >= 60) return "text-yellow-400 dark:text-yellow-300";
    return "text-red-400 dark:text-red-300";
  };

  return (
    <div className="space-y-4 max-w-9xl mx-auto">
      {/* Header Card */}
      {candidateName && (
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 border-0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white">
              Resume Analysis for {candidateName}
            </CardTitle>
            <div className="flex items-center mt-2 space-x-2">
              <Badge variant="secondary" className="text-lg px-4 py-1 bg-white/20 text-white">
                Score: {score}/100
              </Badge>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Analysis Card */}
      <Card className="border-t-4 border-t-indigo-500 dark:bg-gray-800/50">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-0 dark:text-white">
            <FileText className="w-2 h-6 text-indigo-400" />
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

      {/* Score Visualization */}
      <Card className="dark:bg-gray-800/50">
        <CardHeader>
          <CardTitle className="text-2xl dark:text-white">Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Overall Score */}
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className={`text-5xl font-bold ${getScoreColor(score)}`}>
                {score}
              </span>
              <span className="text-2xl text-gray-400 dark:text-gray-500">/100</span>
              <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    score >= 80 
                      ? "bg-green-500 dark:bg-green-400" 
                      : score >= 60 
                        ? "bg-yellow-500 dark:bg-yellow-400" 
                        : "bg-red-500 dark:bg-red-400"
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>

            {/* Scoring Criteria */}
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {scoreDetails.map((detail, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-indigo-500 dark:text-indigo-400">
                      {detail.icon}
                    </div>
                    <h4 className="font-semibold dark:text-white">{detail.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{detail.description}</p>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-lg dark:bg-gray-700 dark:text-gray-200">
                      Weight: {detail.weight}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Highlights Card */}
      {highlights && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Strengths */}
          <Card className="border-t-4 border-t-green-500 dark:bg-gray-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {highlights.strengths?.length > 0 ? (
                  highlights.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
                      <span className="dark:text-gray-200">{strength}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 dark:text-gray-400">No strengths identified.</li>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Weaknesses */}
          <Card className="border-t-4 border-t-red-500 dark:bg-gray-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {highlights.weaknesses?.length > 0 ? (
                  highlights.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-1 text-red-400 flex-shrink-0" />
                      <span className="dark:text-gray-200">{weakness}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 dark:text-gray-400">No weaknesses identified.</li>
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
