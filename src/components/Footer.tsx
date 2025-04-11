
import { Github, Heart, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 py-10">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-2">Rushikesh Jadhav</h3>
            <p className="text-muted-foreground">
              Self-taught software engineer passionate about building impactful web applications.
            </p>
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-2">Connect</h3>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:jadhavrushikesh283@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                jadhavrushikesh283@gmail.com
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-2">Built with</h3>
            <div className="flex flex-wrap gap-2">
              <span className="badge">React</span>
              <span className="badge">TypeScript</span>
              <span className="badge">TailwindCSS</span>
              <span className="badge">Vite</span>
              <span className="badge">GitHub</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500" /> by Rushikesh Jadhav © {new Date().getFullYear()}
          </p>
          <p className="mt-1">
            Hosted on <span className="font-medium">GitHub Pages</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
