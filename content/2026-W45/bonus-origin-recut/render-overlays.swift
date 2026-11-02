import AppKit
import CoreText
import Foundation

let root = URL(fileURLWithPath: "/Users/jeff/Documents/Claude/TItoAi/content/2026-W45/bonus-origin-recut/assets", isDirectory: true)
try FileManager.default.createDirectory(at: root, withIntermediateDirectories: true)

let fontURL = URL(fileURLWithPath: "/Users/jeff/Documents/Claude/TItoAi/brand/fonts/BebasNeue-Regular.ttf")
CTFontManagerRegisterFontsForURL(fontURL as CFURL, .process, nil)
let displayFont = NSFont(name: "BebasNeue-Regular", size: 68) ?? NSFont.systemFont(ofSize: 59, weight: .black)
let bottomFont = NSFont(name: "BebasNeue-Regular", size: 61) ?? NSFont.systemFont(ofSize: 54, weight: .black)

let hooks = [
    "TATAY, NASA SILICON VALLEY?",
    "WEBSITE? AI ANG TINANONG KO.",
    "WALA AKONG BACKGROUND.",
    "TRIAL AND ERROR? OO NAMAN.",
    "AI ANG TULONG, TAO ANG GALAW."
]
let nexts = [
    "NEXT PART - ANG WEBSITE QUESTION",
    "NEXT PART - FIRST OPPORTUNITY",
    "NEXT PART - TRIAL AND ERROR",
    "NEXT PART - NASAAN AKO NGAYON?",
    "FOLLOW TITO AI FOR MORE"
]

func render(_ text: String, size: NSSize, font: NSFont, color: NSColor, path: URL) throws {
    guard let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: Int(size.width), pixelsHigh: Int(size.height), bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0),
          let context = NSGraphicsContext(bitmapImageRep: bitmap) else { fatalError("Could not create overlay") }
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = context
    NSColor.clear.setFill()
    NSRect(origin: .zero, size: size).fill()
    let rect = NSRect(x: 0, y: 0, width: size.width, height: size.height)
    NSColor(calibratedRed: 10.0/255.0, green: 15.0/255.0, blue: 30.0/255.0, alpha: 0.92).setFill()
    NSBezierPath(roundedRect: rect, xRadius: 18, yRadius: 18).fill()
    let attrs: [NSAttributedString.Key: Any] = [.font: font, .foregroundColor: color]
    (text as NSString).draw(in: NSRect(x: 22, y: 17, width: size.width-44, height: size.height-22), withAttributes: attrs)
    context.flushGraphics()
    NSGraphicsContext.restoreGraphicsState()
    try bitmap.representation(using: .png, properties: [:])!.write(to: path)
}

for i in hooks.indices {
    try render(hooks[i], size: NSSize(width: 832, height: 112), font: displayFont,
               color: NSColor(calibratedRed: 1.0, green: 184.0/255.0, blue: 0, alpha: 1),
               path: root.appendingPathComponent("hook-\(i+1).png"))
    try render(nexts[i], size: NSSize(width: 1032, height: 96), font: bottomFont,
               color: .white, path: root.appendingPathComponent("next-\(i+1).png"))
}
