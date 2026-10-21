'use client'

import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'

export default function BirRegistrationSeal() {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) return

    const dialog = dialogRef.current
    if (!dialog) return

    dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
        className="group flex w-fit flex-col items-start gap-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <span className="flex items-center gap-3">
          <Image
            src="/bir-seal-transparent.png"
            alt="BIR registered seal"
            width={132}
            height={136}
            unoptimized
            className="h-auto w-[72px]"
          />
          <Image
            src="/bir-verification.svg"
            alt="BIR verification QR code and registration number"
            width={140}
            height={160}
            unoptimized
            className="h-auto w-[72px] mix-blend-multiply"
          />
        </span>
        <span className="text-xs text-gray-600 underline underline-offset-4 group-hover:text-primary">
          View BIR registration seal
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close()
        }}
        className="m-auto max-h-[90dvh] w-[90vw] max-w-md overflow-y-auto rounded-lg bg-white p-0 text-gray-900 shadow-xl backdrop:bg-black/50"
      >
        <div className="p-6 text-center sm:p-8">
          <div className="flex items-start justify-between gap-4 text-left">
            <h2 id={titleId} className="text-lg font-semibold text-primary">
              BIR registration seal
            </h2>
            <button
              type="button"
              aria-label="Close BIR registration seal"
              onClick={() => dialogRef.current?.close()}
              className="-mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded text-2xl text-gray-500 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Scan the QR code to verify our BIR registration.
          </p>
          <Image
            src="/bir-verification.svg"
            alt="Enlarged BIR verification QR code and registration number"
            width={140}
            height={160}
            unoptimized
            className="mx-auto my-4 h-auto w-full max-w-[280px]"
          />
          <a
            href="/bir.jpeg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            View complete original badge
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </dialog>
    </>
  )
}
