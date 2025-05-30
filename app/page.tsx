"use client";

import React, { useRef, useState } from "react";
import {
  Check,
  Star,
  Zap,
  Shield,
  Users,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import Header from "@/components/ui/shared/Header";
import Footer from "@/components/ui/shared/Footer";

export default function LandingPage() {
  // 4개 섹션 기준, 필요시 개수 조정
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const [isScrolling, setIsScrolling] = useState(false);

  // 휠 이벤트 핸들러 (디바운스 적용)
  const handleWheel = (idx: number, e: React.WheelEvent) => {
    if (isScrolling) return;
    if (e.deltaY > 0 && sectionRefs[idx + 1]) {
      setIsScrolling(true);
      sectionRefs[idx + 1].current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsScrolling(false), 700); // 애니메이션 시간에 맞게 조정
    } else if (e.deltaY < 0 && sectionRefs[idx - 1]) {
      setIsScrolling(true);
      sectionRefs[idx - 1].current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsScrolling(false), 700);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={sectionRefs[0]}
          onWheel={(e) => handleWheel(0, e)}
          style={{ height: "100vh" }}
          className="w-full flex justify-center items-center"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Workflow, Amplify Your Success
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Transform your business processes with our intelligent
                    automation platform. Save time, reduce errors, and focus on
                    what matters most.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width="600"
                  height="400"
                  alt="StreamLine Dashboard"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={sectionRefs[1]}
          onWheel={(e) => handleWheel(1, e)}
          style={{ height: "100vh" }}
          className="w-full flex justify-center items-center"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-gray-200 text-gray-700">Features</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything you need to succeed
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our comprehensive suite of tools helps you automate workflows,
                  collaborate seamlessly, and scale your business efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                      <Zap className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">Smart Automation</h3>
                  </div>
                  <p className="text-muted-foreground">
                    AI-powered workflows that learn from your patterns and
                    automate repetitive tasks, saving you hours every day.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                      <Users className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">Team Collaboration</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Real-time collaboration tools that keep your team aligned
                    and productive, no matter where they work.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                      <BarChart3 className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">Advanced Analytics</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Comprehensive insights and reporting to help you make
                    data-driven decisions and optimize performance.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                      <Shield className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">Enterprise Security</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Bank-level security with end-to-end encryption, SSO
                    integration, and compliance with industry standards.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  width="500"
                  height="400"
                  alt="Features Overview"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          ref={sectionRefs[2]}
          onWheel={(e) => handleWheel(2, e)}
          style={{ height: "100vh" }}
          className="w-full flex justify-center items-center"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-gray-200 text-gray-700">
                  Testimonials
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Loved by teams worldwide
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our customers have to say about their experience with
                  StreamLine.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "StreamLine has revolutionized how we handle our daily
                    operations. The automation features alone have saved us 20+
                    hours per week."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">SJ</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">
                        CEO, TechStart Inc.
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "The collaboration features are incredible. Our remote team
                    feels more connected than ever, and productivity has
                    increased by 40%."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">MC</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Michael Chen</p>
                      <p className="text-xs text-muted-foreground">
                        CTO, InnovateLab
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "Implementation was seamless, and the ROI was immediate.
                    StreamLine pays for itself within the first month of use."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">ER</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Emily Rodriguez</p>
                      <p className="text-xs text-muted-foreground">
                        Operations Director, ScaleUp Co.
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          ref={sectionRefs[3]}
          onWheel={(e) => handleWheel(3, e)}
          style={{ height: "100vh" }}
          className="w-full flex justify-center items-center"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-gray-200 text-gray-700">Pricing</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simple, transparent pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your team. All plans include
                  a 14-day free trial.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>
                    Perfect for small teams getting started
                  </CardDescription>
                  <div className="text-3xl font-bold">
                    $29
                    <span className="text-sm font-normal text-muted-foreground">
                      /month
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Up to 5 team members</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        Basic automation workflows
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Email support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Basic analytics</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100">
                    Start Free Trial
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Professional</CardTitle>
                      <CardDescription>
                        Most popular for growing teams
                      </CardDescription>
                    </div>
                    <Badge>Most Popular</Badge>
                  </div>
                  <div className="text-3xl font-bold">
                    $79
                    <span className="text-sm font-normal text-muted-foreground">
                      /month
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Up to 25 team members</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Advanced automation & AI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Priority support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Advanced analytics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Custom integrations</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100">
                    Start Free Trial
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>
                    For large organizations with custom needs
                  </CardDescription>
                  <div className="text-3xl font-bold">Custom</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Unlimited team members</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Custom workflows & AI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Dedicated support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Custom analytics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">On-premise deployment</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100">
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-48 flex justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to streamline your workflow?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of teams who have transformed their
                  productivity with StreamLine. Start your free trial today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="h-12 px-8 text-white bg-blue-600 hover:bg-blue-700 rounded">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button className="h-12 px-8 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100">
                  Schedule Demo
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
