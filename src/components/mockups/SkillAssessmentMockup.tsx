"use client";

import React, { useMemo, useEffect, useState } from "react";

type Token = { t: string; c: string };

const MOCKUP_DATA = {
  default: {
    difficulty: "Medium",
    topic: "Data Structures",
    title: "Longest Valid Parentheses",
    description: (
      <>
        <p>
          Given a string{" "}
          <span style={{ fontFamily: "monospace" }}>s</span>{" "}
          containing just{" "}
          <span style={{ fontFamily: "monospace" }}>(</span>{" "}
          and{" "}
          <span style={{ fontFamily: "monospace" }}>)</span>
          , return the length of the longest valid (well-formed) parentheses substring.
        </p>
        <p>A substring is valid if every opening parenthesis has a corresponding closing parenthesis in the correct order.</p>
      </>
    ),
    examples: [
      { input: 's = "(()"', output: "2", explanation: 'The longest valid substring is "()".' },
      { input: 's = ")()())"', output: "4", explanation: 'The longest valid substring is "()()".' },
    ],
    language: "Python 3",
    codeLines: [
      [{ t: "def", c: "#7c3aed" }, { t: " ", c: "#111827" }, { t: "longestValidParentheses", c: "#2563eb" }, { t: "(", c: "#111827" }, { t: "s", c: "#111827" }, { t: ": ", c: "#111827" }, { t: "str", c: "#2563eb" }, { t: ")", c: "#111827" }, { t: " -> ", c: "#111827" }, { t: "int", c: "#2563eb" }, { t: ":", c: "#111827" }],
      [{ t: "    ", c: "#111827" }, { t: "stack", c: "#111827" }, { t: " = ", c: "#111827" }, { t: "[-1]", c: "#f97316" }],
      [{ t: "    ", c: "#111827" }, { t: "max_len", c: "#111827" }, { t: " = ", c: "#111827" }, { t: "0", c: "#f97316" }],
      [{ t: "    ", c: "#111827" }, { t: "for", c: "#7c3aed" }, { t: " ", c: "#111827" }, { t: "i", c: "#111827" }, { t: ", ", c: "#111827" }, { t: "char", c: "#111827" }, { t: " ", c: "#111827" }, { t: "in", c: "#7c3aed" }, { t: " ", c: "#111827" }, { t: "enumerate", c: "#2563eb" }, { t: "(s):", c: "#111827" }],
      [{ t: "        ", c: "#111827" }, { t: "if", c: "#7c3aed" }, { t: " ", c: "#111827" }, { t: "char", c: "#111827" }, { t: " == ", c: "#111827" }, { t: "'('", c: "#22c55e" }, { t: ":", c: "#111827" }],
      [{ t: "            ", c: "#111827" }, { t: "stack", c: "#111827" }, { t: ".", c: "#111827" }, { t: "append", c: "#2563eb" }, { t: "(", c: "#111827" }, { t: "i", c: "#111827" }, { t: ")", c: "#111827" }],
      [{ t: "        ", c: "#111827" }, { t: "else", c: "#7c3aed" }, { t: ":", c: "#111827" }],
      [{ t: "            ", c: "#111827" }, { t: "stack", c: "#111827" }, { t: ".", c: "#111827" }, { t: "pop", c: "#2563eb" }, { t: "()", c: "#111827" }],
      [{ t: "            ", c: "#111827" }, { t: "if", c: "#7c3aed" }, { t: " ", c: "#111827" }, { t: "not", c: "#7c3aed" }, { t: " ", c: "#111827" }, { t: "stack", c: "#111827" }, { t: ":", c: "#111827" }],
      [{ t: "                ", c: "#111827" }, { t: "stack", c: "#111827" }, { t: ".", c: "#111827" }, { t: "append", c: "#2563eb" }, { t: "(", c: "#111827" }, { t: "i", c: "#111827" }, { t: ")", c: "#111827" }],
      [{ t: "            ", c: "#111827" }, { t: "else", c: "#7c3aed" }, { t: ":", c: "#111827" }],
      [{ t: "                ", c: "#111827" }, { t: "max_len", c: "#111827" }, { t: " = ", c: "#111827" }, { t: "max", c: "#2563eb" }, { t: "(", c: "#111827" }, { t: "max_len", c: "#111827" }, { t: ", ", c: "#111827" }, { t: "i", c: "#111827" }, { t: " - ", c: "#111827" }, { t: "stack", c: "#111827" }, { t: "[-1])", c: "#111827" }],
      [{ t: "    ", c: "#111827" }, { t: "return", c: "#7c3aed" }, { t: " ", c: "#111827" }, { t: "max_len", c: "#111827" }],
    ],
    testCases: [
      { name: "Test Case 1", input: 's="(()"', expected: "2", output: "2" },
      { name: "Test Case 2", input: 's=")()())"', expected: "4", output: "4" },
      { name: "Test Case 3", input: 's="()(())"', expected: "6", output: "6" },
    ]
  },
  aws: {
    difficulty: "Hard",
    topic: "Cloud Architect",
    title: "Design a scalable API",
    description: (
      <>
        <p>
          You are deploying a serverless API that handles high concurrency. Using AWS CDK in Python, define a Stack that contains an API Gateway integrated with a Lambda function.
        </p>
        <p>
          Ensure the Lambda uses a Node.js 18.x runtime and is granted read permissions to an existing DynamoDB table.
        </p>
      </>
    ),
    examples: [
      { input: 'Props: { tableName: "Users" }', output: "API Gateway Endpoint URL", explanation: "Returns the generated endpoint URL." }
    ],
    language: "Python 3",
    codeLines: [
      [{ t: "from", c: "#7c3aed" }, { t: " aws_cdk ", c: "#111827" }, { t: "import", c: "#7c3aed" }, { t: " Stack, aws_lambda ", c: "#111827" }, { t: "as", c: "#7c3aed" }, { t: " _lambda, aws_apigateway ", c: "#111827" }, { t: "as", c: "#7c3aed" }, { t: " apigw", c: "#111827" }],
      [{ t: "from", c: "#7c3aed" }, { t: " constructs ", c: "#111827" }, { t: "import", c: "#7c3aed" }, { t: " Construct", c: "#111827" }],
      [{ t: "", c: "#111827" }],
      [{ t: "class", c: "#7c3aed" }, { t: " ServerlessAPIStack", c: "#2563eb" }, { t: "(Stack):", c: "#111827" }],
      [{ t: "    ", c: "#111827" }, { t: "def", c: "#7c3aed" }, { t: " ", c: "#111827" }, { t: "__init__", c: "#2563eb" }, { t: "(self, scope: Construct, id: str, **kwargs):", c: "#111827" }],
      [{ t: "        ", c: "#111827" }, { t: "super", c: "#2563eb" }, { t: "().__init__(scope, id, **kwargs)", c: "#111827" }],
      [{ t: "", c: "#111827" }],
      [{ t: "        ", c: "#111827" }, { t: "handler", c: "#111827" }, { t: " = _lambda.Function(self, ", c: "#111827" }, { t: "'ApiHandler'", c: "#22c55e" }, { t: ",", c: "#111827" }],
      [{ t: "            ", c: "#111827" }, { t: "runtime=_lambda.Runtime.NODEJS_18_X,", c: "#111827" }],
      [{ t: "            ", c: "#111827" }, { t: "code=_lambda.Code.from_asset(", c: "#111827" }, { t: "'src'", c: "#22c55e" }, { t: "),", c: "#111827" }],
      [{ t: "            ", c: "#111827" }, { t: "handler=", c: "#111827" }, { t: "'index.handler'", c: "#22c55e" }],
      [{ t: "        ", c: "#111827" }, { t: ")", c: "#111827" }],
      [{ t: "", c: "#111827" }],
      [{ t: "        ", c: "#111827" }, { t: "apigw.LambdaRestApi(self, ", c: "#111827" }, { t: "'Endpoint'", c: "#22c55e" }, { t: ",", c: "#111827" }],
      [{ t: "            ", c: "#111827" }, { t: "handler=handler", c: "#111827" }],
      [{ t: "        ", c: "#111827" }, { t: ")", c: "#111827" }],
    ],
    testCases: [
      { name: "Test Case 1", input: 'Props: { ... }', expected: "URL", output: "URL" }
    ]
  },
  azure: {
    difficulty: "Medium",
    topic: "Cloud Identity",
    title: "Authenticate Azure App",
    description: (
      <>
        <p>
          Write a C# snippet using Azure.Identity to authenticate with DefaultAzureCredential.
        </p>
        <p>
          Then use the credential to create an instance of SecretClient pointing to a given Key Vault URI.
        </p>
      </>
    ),
    examples: [
      { input: 'vaultUri = "https://my-vault.vault.azure.net/"', output: "SecretClient instance", explanation: "Client ready for operations" }
    ],
    language: "C#",
    codeLines: [
      [{ t: "using", c: "#7c3aed" }, { t: " Azure.Identity;", c: "#111827" }],
      [{ t: "using", c: "#7c3aed" }, { t: " Azure.Security.KeyVault.Secrets;", c: "#111827" }],
      [{ t: "using", c: "#7c3aed" }, { t: " System;", c: "#111827" }],
      [{ t: "", c: "#111827" }],
      [{ t: "public", c: "#7c3aed" }, { t: " class", c: "#7c3aed" }, { t: " KeyVaultService", c: "#2563eb" }],
      [{ t: "{", c: "#111827" }],
      [{ t: "    ", c: "#111827" }, { t: "public", c: "#7c3aed" }, { t: " SecretClient ", c: "#2563eb" }, { t: "CreateClient", c: "#111827" }, { t: "(string vaultUri)", c: "#111827" }],
      [{ t: "    ", c: "#111827" }, { t: "{", c: "#111827" }],
      [{ t: "        ", c: "#111827" }, { t: "// Use managed identity or local creds", c: "#6b7280" }],
      [{ t: "        ", c: "#111827" }, { t: "var", c: "#7c3aed" }, { t: " credential = ", c: "#111827" }, { t: "new", c: "#7c3aed" }, { t: " DefaultAzureCredential();", c: "#2563eb" }],
      [{ t: "", c: "#111827" }],
      [{ t: "        ", c: "#111827" }, { t: "var", c: "#7c3aed" }, { t: " client = ", c: "#111827" }, { t: "new", c: "#7c3aed" }, { t: " SecretClient(", c: "#2563eb" }],
      [{ t: "            ", c: "#111827" }, { t: "new", c: "#7c3aed" }, { t: " Uri(vaultUri),", c: "#2563eb" }],
      [{ t: "            ", c: "#111827" }, { t: "credential", c: "#111827" }],
      [{ t: "        ", c: "#111827" }, { t: ");", c: "#111827" }],
      [{ t: "", c: "#111827" }],
      [{ t: "        ", c: "#111827" }, { t: "return", c: "#7c3aed" }, { t: " client;", c: "#111827" }],
      [{ t: "    ", c: "#111827" }, { t: "}", c: "#111827" }],
      [{ t: "}", c: "#111827" }],
    ],
    testCases: [
      { name: "Test Case 1", input: 'vaultUri="https://..."', expected: "SecretClient", output: "SecretClient" }
    ]
  },
  k8s: {
    difficulty: "Hard",
    topic: "Container Orchestration",
    title: "Nginx Deployment",
    description: (
      <>
        <p>
          Create a Kubernetes Deployment YAML for Nginx. It should have 3 replicas and match labels with the selector <span style={{ fontFamily: "monospace" }}>app: nginx</span>.
        </p>
        <p>Expose port 80 and set resource limits to 128Mi memory.</p>
      </>
    ),
    examples: [
      { input: "N/A", output: "Valid YAML Configuration", explanation: "Applies the deployment via kubectl" }
    ],
    language: "YAML",
    codeLines: [
      [{ t: "apiVersion", c: "#2563eb" }, { t: ": apps/v1", c: "#22c55e" }],
      [{ t: "kind", c: "#2563eb" }, { t: ": Deployment", c: "#22c55e" }],
      [{ t: "metadata", c: "#2563eb" }, { t: ":", c: "#111827" }],
      [{ t: "  ", c: "#111827" }, { t: "name", c: "#2563eb" }, { t: ": nginx-deployment", c: "#22c55e" }],
      [{ t: "spec", c: "#2563eb" }, { t: ":", c: "#111827" }],
      [{ t: "  ", c: "#111827" }, { t: "replicas", c: "#2563eb" }, { t: ": 3", c: "#f97316" }],
      [{ t: "  ", c: "#111827" }, { t: "selector", c: "#2563eb" }, { t: ":", c: "#111827" }],
      [{ t: "    ", c: "#111827" }, { t: "matchLabels", c: "#2563eb" }, { t: ":", c: "#111827" }],
      [{ t: "      ", c: "#111827" }, { t: "app", c: "#2563eb" }, { t: ": nginx", c: "#22c55e" }],
      [{ t: "  ", c: "#111827" }, { t: "template", c: "#2563eb" }, { t: ":", c: "#111827" }],
      [{ t: "    ", c: "#111827" }, { t: "metadata", c: "#2563eb" }, { t: ":", c: "#111827" }],
      [{ t: "      ", c: "#111827" }, { t: "labels", c: "#2563eb" }, { t: ":", c: "#111827" }],
      [{ t: "        ", c: "#111827" }, { t: "app", c: "#2563eb" }, { t: ": nginx", c: "#22c55e" }],
      [{ t: "    ", c: "#111827" }, { t: "spec", c: "#2563eb" }, { t: ":", c: "#111827" }],
      [{ t: "      ", c: "#111827" }, { t: "containers", c: "#2563eb" }, { t: ":", c: "#111827" }],
      [{ t: "      - ", c: "#111827" }, { t: "name", c: "#2563eb" }, { t: ": nginx", c: "#22c55e" }],
      [{ t: "        ", c: "#111827" }, { t: "image", c: "#2563eb" }, { t: ": nginx:1.14.2", c: "#22c55e" }],
      [{ t: "        ", c: "#111827" }, { t: "ports", c: "#2563eb" }, { t: ":", c: "#111827" }],
      [{ t: "        - ", c: "#111827" }, { t: "containerPort", c: "#2563eb" }, { t: ": 80", c: "#f97316" }],
    ],
    testCases: [
      { name: "Lint Check", input: 'yaml-lint', expected: "Pass", output: "Pass" }
    ]
  }
};

export default function SkillAssessmentMockup({ tech }: { tech?: "aws" | "azure" | "k8s" | null }) {
  const [displayTech, setDisplayTech] = useState<"default" | "aws" | "azure" | "k8s">("default");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const targetTech = tech || "default";
    if (targetTech !== displayTech) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setDisplayTech(targetTech);
        setAnimating(false);
      }, 150); // half-way fade out
      return () => clearTimeout(timer);
    }
  }, [tech, displayTech]);

  const currentData = MOCKUP_DATA[displayTech];

  return (
    <div className="mx-auto w-full max-w-[720px]" style={{ minHeight: 460 }}>
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: 14,
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          border: "1px solid rgba(0,0,0,0.06)",
          background: "#F6F7FB",
          height: 440,
        }}
      >
        {/* Browser chrome */}
        <div
          className="flex items-center gap-3 px-4 relative z-10"
          style={{
            height: 46,
            background: "#ECECEC",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="h-[10px] w-[10px] rounded-full" style={{ background: "#FF5F57" }} aria-hidden />
            <span className="h-[10px] w-[10px] rounded-full" style={{ background: "#FFBD44" }} aria-hidden />
            <span className="h-[10px] w-[10px] rounded-full" style={{ background: "#28C840" }} aria-hidden />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div
              className="flex w-[78%] items-center justify-center rounded-full px-4 py-2"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.10)",
                color: "#555",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                fontSize: 12,
              }}
            >
              onskill.rabbitt.com/assessment/coding
            </div>
          </div>
          <div className="w-[46px]" aria-hidden />
        </div>

        {/* Coding screen (off-white) */}
        <div className="h-[calc(100%-46px)] relative z-10" style={{ background: "#F6F7FB" }}>
          <div 
            className="flex h-full transition-opacity duration-200"
            style={{ opacity: animating ? 0 : 1 }}
          >
            {/* Left: Problem statement */}
            <div
              className="h-full border-r px-5 py-5 flex flex-col"
              style={{
                width: "40%",
                borderColor: "rgba(0,0,0,0.08)",
                background: "#FBFCFF",
                overflow: "hidden",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{
                    background: currentData.difficulty === "Hard" ? "rgba(239,68,68,0.16)" : "rgba(251,146,60,0.16)",
                    color: currentData.difficulty === "Hard" ? "#b91c1c" : "#b45309",
                    border: currentData.difficulty === "Hard" ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(251,146,60,0.25)",
                  }}
                >
                  {currentData.difficulty}
                </span>
                <span className="text-[12px]" style={{ color: "rgba(17,24,39,0.65)" }}>
                  {currentData.topic}
                </span>
              </div>

              <div className="mt-3 text-[16px] font-extrabold" style={{ color: "#0f172a" }}>
                {currentData.title}
              </div>

              <div className="mt-3 space-y-2 text-[12px]" style={{ color: "rgba(17,24,39,0.64)", lineHeight: 1.55 }}>
                {currentData.description}
              </div>

              <div className="mt-4 space-y-3">
                {currentData.examples.map((ex, i) => (
                  <div key={i} className="rounded-[10px] px-3 py-2" style={{ background: "#F3F4F6", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <div
                      className="text-[11px]"
                      style={{
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        color: "rgba(15,23,42,0.82)",
                        lineHeight: 1.55,
                      }}
                    >
                      <div>
                        <span className="font-semibold" style={{ color: "rgba(15,23,42,0.75)" }}>
                          Input:
                        </span>{" "}
                        {ex.input}
                      </div>
                      <div>
                        <span className="font-semibold" style={{ color: "rgba(15,23,42,0.75)" }}>
                          Output:
                        </span>{" "}
                        {ex.output}
                      </div>
                      <div>
                        <span className="font-semibold" style={{ color: "rgba(15,23,42,0.75)" }}>
                          Explanation:
                        </span>{" "}
                        {ex.explanation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  className="rounded-[10px] px-3 py-2 text-[12px] font-semibold"
                  style={{ border: "1px solid rgba(0,0,0,0.12)", color: "rgba(15,23,42,0.82)", background: "#ffffff" }}
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  className="rounded-[10px] px-3 py-2 text-[12px] font-semibold text-white"
                  style={{
                    background: "#2563eb",
                    border: "1px solid rgba(37,99,235,0.35)",
                    boxShadow: "0 10px 26px rgba(37,99,235,0.20)",
                  }}
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Right: Code editor */}
            <div className="h-full flex flex-col" style={{ width: "60%", background: "#F6F7FB" }}>
              <div
                className="flex items-center justify-between px-4 shrink-0"
                style={{
                  height: 44,
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  background: "#F0F2F7",
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-[12px] font-semibold"
                    style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#fff", color: "rgba(15,23,42,0.86)" }}
                  >
                    {currentData.language}
                    <span className="inline-block translate-y-[-1px]" style={{ color: "rgba(15,23,42,0.55)" }}>
                      ▾
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[12px]" style={{ color: "rgba(15,23,42,0.60)" }}>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: "#22c55e" }} aria-hidden />
                    Auto Save
                  </span>
                  <span className="flex items-center gap-2" aria-hidden>
                    <span className="text-[14px]">☀</span>
                    <span className="text-[14px]">⚙</span>
                  </span>
                </div>
              </div>

              <div className="px-4 py-4 flex flex-col flex-1 overflow-hidden">
                <div className="overflow-hidden rounded-[12px] shrink-0" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
                  <div className="flex">
                    <div
                      className="select-none px-3 py-3 text-right text-[12px]"
                      style={{
                        width: 44,
                        background: "#F3F4F6",
                        borderRight: "1px solid rgba(0,0,0,0.06)",
                        color: "rgba(15,23,42,0.45)",
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        lineHeight: 1.55,
                      }}
                      aria-hidden
                    >
                      {currentData.codeLines.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <pre
                      className="m-0 flex-1 px-3 py-3 text-[12px]"
                      style={{
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        lineHeight: 1.55,
                        color: "#111827",
                        background: "#ffffff",
                        overflowX: "auto",
                        whiteSpace: "pre",
                      }}
                    >
                      <code>
                        {currentData.codeLines.map((line, i) => (
                          <div key={i}>
                            {line.length === 0 && <br />}
                            {line.map((tok, j) => (
                              <span key={j} style={{ color: tok.c }}>
                                {tok.t}
                              </span>
                            ))}
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-5 border-b shrink-0" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                  <button type="button" className="pb-2 text-[12px] font-semibold" style={{ color: "#2563eb", borderBottom: "2px solid #2563eb" }}>
                    Test Cases
                  </button>
                  <button type="button" className="pb-2 text-[12px] font-semibold" style={{ color: "rgba(15,23,42,0.55)" }}>
                    Custom Input
                  </button>
                </div>

                <div className="mt-3 space-y-2 shrink-0">
                  {currentData.testCases.map((t, i) => (
                    <div key={i} className="rounded-[12px] px-3 py-2" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
                      <div className="flex items-center justify-between">
                        <div className="text-[12px] font-semibold" style={{ color: "rgba(15,23,42,0.82)" }}>
                          {t.name}
                        </div>
                        <div className="text-[13px] font-extrabold" style={{ color: "#22c55e" }}>
                          ✓
                        </div>
                      </div>
                      <div
                        className="mt-1 grid grid-cols-3 gap-2 text-[11px]"
                        style={{
                          color: "rgba(15,23,42,0.62)",
                          fontFamily:
                            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        }}
                      >
                        <div>
                          <span className="font-semibold" style={{ color: "rgba(15,23,42,0.70)" }}>
                            Input:
                          </span>{" "}
                          {t.input}
                        </div>
                        <div>
                          <span className="font-semibold" style={{ color: "rgba(15,23,42,0.70)" }}>
                            Expected:
                          </span>{" "}
                          {t.expected}
                        </div>
                        <div>
                          <span className="font-semibold" style={{ color: "rgba(15,23,42,0.70)" }}>
                            Output:
                          </span>{" "}
                          {t.output}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between shrink-0">
                  <button
                    type="button"
                    className="rounded-[10px] px-3 py-2 text-[12px] font-semibold"
                    style={{ border: "1px solid rgba(0,0,0,0.14)", background: "transparent", color: "rgba(15,23,42,0.78)" }}
                  >
                    ▷ Run Code
                  </button>
                  <button
                    type="button"
                    className="rounded-[10px] px-3 py-2 text-[12px] font-semibold text-white"
                    style={{
                      background: "#2563eb",
                      border: "1px solid rgba(37,99,235,0.35)",
                      boxShadow: "0 10px 26px rgba(37,99,235,0.18)",
                    }}
                  >
                    Submit Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: "radial-gradient(90% 65% at 50% 0%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 40%)",
            opacity: 0.55,
          }}
        />
      </div>
    </div>
  );
}
