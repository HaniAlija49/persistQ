import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  variant?: "header" | "footer" | "auth"
  showText?: boolean
  className?: string
}

export function Logo({ variant = "header", showText = true, className = "" }: LogoProps) {
  const sizes = {
    header: { width: 32, height: 32, textClass: "text-xl" },
    footer: { width: 28, height: 28, textClass: "text-lg" },
    auth: { width: 40, height: 40, textClass: "text-2xl" }
  }

  const { width, height, textClass } = sizes[variant]

  const logoContent = (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative" style={{ width, height }}>
        <Image
          src="/logo-small.png"
          alt="PersistQ Logo"
          width={width}
          height={height}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={`font-semibold ${textClass} ${variant === "auth" ? "bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] bg-clip-text text-transparent" : ""}`}>
          PersistQ
        </span>
      )}
    </div>
  )

  return variant === "auth" ? (
    <Link href="/" className="inline-flex items-center gap-2">
      {logoContent}
    </Link>
  ) : (
    logoContent
  )
}
