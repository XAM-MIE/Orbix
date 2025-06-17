'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X, 
  Sparkles, 
  Zap, 
  Crown,
  Users,
  MessageSquare,
  ArrowRight,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      price: { monthly: 0, annual: 0 },
      badge: "Free",
      badgeColor: "bg-green-500",
      features: [
        "Up to 3 projects",
        "Basic AI assistance",
        "Community support",
        "5GB storage",
        "Basic templates"
      ],
      limitations: [
        "Limited voice commands",
        "No team collaboration",
        "Basic deployment options"
      ],
      cta: "Get Started Free",
      href: "/signup",
      popular: false
    },
    {
      name: "Pro",
      description: "For professional developers and growing teams",
      price: { monthly: 29, annual: 24 },
      badge: "Most Popular",
      badgeColor: "bg-gradient-to-r from-purple-500 to-blue-500",
      features: [
        "Unlimited projects",
        "Advanced AI features",
        "Priority support",
        "100GB storage",
        "Premium templates",
        "Team collaboration (up to 5)",
        "Advanced voice commands",
        "Custom integrations"
      ],
      limitations: [],
      cta: "Start Pro Trial",
      href: "/signup?plan=pro",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large teams and organizations",
      price: { monthly: 99, annual: 79 },
      badge: "Enterprise",
      badgeColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "24/7 dedicated support",
        "1TB storage",
        "Custom AI training",
        "Advanced security features",
        "SSO integration",
        "Custom deployment options",
        "SLA guarantee"
      ],
      limitations: [],
      cta: "Contact Sales",
      href: "/contact",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, all paid plans come with a 14-day free trial. No credit card required."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 sm:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Simple Pricing
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Choose Your Perfect Plan
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start free and scale as you grow. All plans include our core AI-powered development features.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={cn("text-sm", !isAnnual ? "text-foreground" : "text-muted-foreground")}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                isAnnual ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  isAnnual ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span className={cn("text-sm", isAnnual ? "text-foreground" : "text-muted-foreground")}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative",
                plan.popular && "scale-105"
              )}
            >
              <Card className={cn(
                "h-full relative overflow-hidden",
                plan.popular && "border-2 border-purple-500 shadow-xl"
              )}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-2 text-sm font-medium">
                    {plan.badge}
                  </div>
                )}
                
                <CardHeader className={cn("text-center", plan.popular && "pt-12")}>
                  {!plan.popular && (
                    <Badge className={cn("w-fit mx-auto mb-4", plan.badgeColor)}>
                      {plan.badge}
                    </Badge>
                  )}
                  
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  
                  <div className="py-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-muted-foreground ml-1">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      )}
                    </div>
                    {isAnnual && plan.price.monthly > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed annually (${plan.price.annual * 12}/year)
                      </p>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <Button 
                    asChild 
                    className={cn(
                      "w-full",
                      plan.popular 
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600" 
                        : ""
                    )}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link href={plan.href}>
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground">
                        <X className="w-4 h-4 text-red-500 mr-3 flex-shrink-0" />
                        {limitation}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about our pricing</p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of developers who are already building amazing applications with Orbix.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/features">
                <Sparkles className="mr-2 h-4 w-4" />
                View Features
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
