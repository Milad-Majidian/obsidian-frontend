'use client'

import Image from "next/image";

export const AuthForm = () => {
    return (
      <>
      <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section - Image */}
      <div className="lg:w-1/2 relative hidden lg:block">
        <Image
          src="/auth/person.png" // Replace with your image path
          alt="Auth background"
          fill
          className="object-cover"
          priority
          sizes="50vw"
          quality={85}
        />
          <Image
          src="/auth/element.png" // Replace with your image path
          alt="Auth background"
          fill
          className="object-cover"
          priority
          sizes="50vw"
          quality={85}
        />
      </div>

      {/* Right Section - Auth Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gray-50">
        <h2>Login/Register</h2>
      </div>
    </div>
    </>
    )
}