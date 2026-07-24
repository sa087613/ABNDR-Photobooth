// app/privacy/page.tsx

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-16 text-zinc-800">
        <h1 className="mb-8 text-2xl font-semibold text-black">Privacy Policy</h1>

        <p className="mb-6 leading-relaxed">
          Your photos stay on your device. This photobooth
          runs entirely in your browser, so there's nothing for us to
          store, lose, or leak, because we never actually get a copy of
          your photo in the first place.
        </p>

        <p className="mb-6 leading-relaxed">
          When you take a picture, it's captured through your browser's
          camera and dropped straight into the strip you see on screen.
          Uploading works the same way, just reading a file from your
          device instead. Either way, that image only exists in your
          browser's memory for that session. Close the tab, hit restart, or
          just walk away, and it's gone. Nothing gets sent anywhere unless
          you choose to download or share your finished strip yourself.
        </p>

        <p className="mb-6 leading-relaxed">
          Camera access works through the normal permission prompt your
          browser already shows you. If you say no, the camera option just
          won't work, but uploading a photo still will. You can turn that
          permission off again any time in your browser's settings.
        </p>

        <p className="mb-6 leading-relaxed">
          We don't ask who you are. No account, no email, no name field
          anywhere on the site. You can use it without telling us a single
          thing about yourself.
        </p>

        <p className="mb-6 leading-relaxed">
          We do look at basic, anonymous traffic patterns, things like how
          many people visit and roughly what device or browser they're
          using through Vercel. It just helps us understand if the site is working well
          and where to make it better. It's not tied to you personally and
          we don't sell or share it.
        </p>

        <p className="mb-6 leading-relaxed">
          Everything on the site loads over HTTPS. And honestly, since your
          photos never leave your browser to begin with, that's the real
          safeguard here. There's no database of photos sitting around that
          could ever get exposed.
        </p>

        <p className="leading-relaxed">
          Questions or concerns? Email{" "}
          <a href="mailto:your@email.com" className="underline hover:text-black">
            abanadorsophia@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}