"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/signup">
          <Button variant="ghost" className="mb-6 hover:cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to App
          </Button>
        </Link>

        <Card className="border-border">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">
                  Terms and Conditions
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Last updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-8">
                <section>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to our collaborative drawing application. By
                    accessing or using our service, you agree to be bound by
                    these Terms and Conditions. Please read them carefully
                    before using our platform.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    By creating an account, accessing, or using our drawing
                    application, you acknowledge that you have read, understood,
                    and agree to be bound by these Terms and Conditions and our
                    Privacy Policy.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    If you do not agree to these terms, please do not use our
                    service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    2. Use of Service
                  </h2>
                  <h3 className="text-lg font-medium mb-3 text-foreground/90">
                    2.1 Permitted Use
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    You may use our service for lawful purposes only. You agree
                    to use the platform to create, edit, and share drawings and
                    collaborate with other users in accordance with these terms.
                  </p>

                  <h3 className="text-lg font-medium mb-3 mt-4 text-foreground/90">
                    2.2 Prohibited Activities
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-2">
                    <li>
                      Upload or share content that is illegal, harmful, or
                      violates intellectual property rights
                    </li>
                    <li>
                      Attempt to gain unauthorized access to our systems or
                      other user accounts
                    </li>
                    <li>
                      Use the service to distribute malware, spam, or engage in
                      phishing
                    </li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>
                      Reverse engineer or attempt to extract source code from
                      our platform
                    </li>
                    <li>
                      Use automated systems or bots without explicit permission
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    3. User Accounts
                  </h2>
                  <h3 className="text-lg font-medium mb-3 text-foreground/90">
                    3.1 Account Creation
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    You must create an account to access certain features. You
                    agree to provide accurate, current, and complete information
                    during registration and to update such information to keep
                    it accurate.
                  </p>

                  <h3 className="text-lg font-medium mb-3 mt-4 text-foreground/90">
                    3.2 Account Security
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    You are responsible for maintaining the confidentiality of
                    your account credentials and for all activities that occur
                    under your account. You must notify us immediately of any
                    unauthorized use of your account.
                  </p>

                  <h3 className="text-lg font-medium mb-3 mt-4 text-foreground/90">
                    3.3 Account Termination
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to suspend or terminate your account if
                    you violate these terms or engage in activities that we
                    determine, in our sole discretion, to be harmful to our
                    service or other users.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    4. Content Ownership and Rights
                  </h2>
                  <h3 className="text-lg font-medium mb-3 text-foreground/90">
                    4.1 Your Content
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    You retain all rights to the drawings and content you create
                    using our service. By uploading or creating content on our
                    platform, you grant us a worldwide, non-exclusive,
                    royalty-free license to host, store, and display your
                    content solely for the purpose of operating and providing
                    our service.
                  </p>

                  <h3 className="text-lg font-medium mb-3 mt-4 text-foreground/90">
                    4.2 Shared Content
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    When you share drawings with other users, you grant those
                    users permission to view, edit, and collaborate on the
                    shared content according to the permissions you set.
                  </p>

                  <h3 className="text-lg font-medium mb-3 mt-4 text-foreground/90">
                    4.3 Platform Rights
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All intellectual property rights in the platform itself,
                    including but not limited to software, design, trademarks,
                    and logos, remain our exclusive property.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    5. Privacy and Data Protection
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We are committed to protecting your privacy. Our collection,
                    use, and disclosure of personal information is governed by
                    our Privacy Policy, which is incorporated into these Terms
                    by reference.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By using our service, you consent to the collection and use
                    of your information as described in our Privacy Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    6. Service Availability
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We strive to provide reliable and uninterrupted service, but
                    we do not guarantee that our platform will be available at
                    all times or free from errors, bugs, or interruptions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify, suspend, or discontinue any
                    aspect of our service at any time, with or without notice.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    7. Limitation of Liability
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    To the fullest extent permitted by law, we shall not be
                    liable for any indirect, incidental, special, consequential,
                    or punitive damages, or any loss of profits or revenues,
                    whether incurred directly or indirectly, or any loss of
                    data, use, goodwill, or other intangible losses resulting
                    from:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-2">
                    <li>Your use or inability to use our service</li>
                    <li>
                      Any unauthorized access to or use of our servers or your
                      personal information
                    </li>
                    <li>
                      Any interruption or cessation of transmission to or from
                      our service
                    </li>
                    <li>
                      Any bugs, viruses, or other harmful code that may be
                      transmitted through our service
                    </li>
                    <li>Any loss or damage to your drawings or content</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    8. Indemnification
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You agree to indemnify, defend, and hold harmless our
                    company, its officers, directors, employees, and agents from
                    and against any claims, liabilities, damages, losses, and
                    expenses, including reasonable attorney fees, arising out of
                    or in any way connected with your access to or use of our
                    service, your violation of these Terms, or your infringement
                    of any intellectual property or other rights of any third
                    party.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    9. Changes to Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We reserve the right to modify these Terms at any time. We
                    will notify users of any material changes by posting the
                    updated Terms on our platform and updating the "Last
                    updated" date.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Your continued use of our service after any such changes
                    constitutes your acceptance of the new Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    10. Governing Law
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These Terms shall be governed by and construed in accordance
                    with the laws of the jurisdiction in which our company is
                    registered, without regard to its conflict of law
                    provisions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Any disputes arising from these Terms or your use of our
                    service shall be resolved in the courts of that
                    jurisdiction.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    11. Contact Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    If you have any questions about these Terms and Conditions,
                    please contact us at:
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">
                        Email:
                      </span>{" "}
                      tejas.teju02@gmail.com
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-1">
                      <span className="font-medium text-foreground">Name:</span>{" "}
                      Tejas
                    </p>
                  </div>
                </section>

                <Separator />

                <section className="pb-4">
                  <p className="text-sm text-muted-foreground text-center">
                    By using our service, you acknowledge that you have read and
                    understood these Terms and Conditions and agree to be bound
                    by them.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/signup">
            <Button size="lg" className="font-medium hover:cursor-pointer">
              I Accept the Terms
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
