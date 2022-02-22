using Catalog.Host.Data.Entities;

namespace Catalog.Host.Data;

public static class DbInitializer
{
    public static async Task Initialize(ApplicationDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        if (!context.CatalogBrands.Any())
        {
            await context.CatalogBrands.AddRangeAsync(GetPreconfiguredCatalogBrands());

            await context.SaveChangesAsync();
        }

        if (!context.CatalogTypes.Any())
        {
            await context.CatalogTypes.AddRangeAsync(GetPreconfiguredCatalogTypes());

            await context.SaveChangesAsync();
        }

        if (!context.CatalogItems.Any())
        {
            await context.CatalogItems.AddRangeAsync(GetPreconfiguredItems());

            await context.SaveChangesAsync();
        }
    }

    private static IEnumerable<CatalogBrand> GetPreconfiguredCatalogBrands()
    {
        return new List<CatalogBrand>()
        {
            new CatalogBrand() { Brand = "A4Tech" },                  // 1
            new CatalogBrand() { Brand = "AMD" },                     // 2
            new CatalogBrand() { Brand = "Aorus" },                   // 3
            new CatalogBrand() { Brand = "Apple" },                   // 4
            new CatalogBrand() { Brand = "Asus" },                    // 5
            new CatalogBrand() { Brand = "Bloody" },                  // 6
            new CatalogBrand() { Brand = "Edifier" },                 // 7
            new CatalogBrand() { Brand = "Gigabyte" },                // 8
            new CatalogBrand() { Brand = "Hator" },                   // 9
            new CatalogBrand() { Brand = "Honor" },                   // 10
            new CatalogBrand() { Brand = "Huawei" },                  // 11
            new CatalogBrand() { Brand = "HyperX" },                  // 12
            new CatalogBrand() { Brand = "Intel" },                   // 13
            new CatalogBrand() { Brand = "Keychron" },                // 14
            new CatalogBrand() { Brand = "Kingston" },                // 15
            new CatalogBrand() { Brand = "Logitech" },                // 16
            new CatalogBrand() { Brand = "MSI" },                     // 17
            new CatalogBrand() { Brand = "Razer" },                   // 18
            new CatalogBrand() { Brand = "Samsung" },                 // 19
            new CatalogBrand() { Brand = "Seagate" },                 // 20
            new CatalogBrand() { Brand = "Sony" },                    // 21
            new CatalogBrand() { Brand = "SteelSeries" },             // 22
            new CatalogBrand() { Brand = "Varmilo" },                 // 23
            new CatalogBrand() { Brand = "Western Digital" },         // 24
        };
    }

    private static IEnumerable<CatalogType> GetPreconfiguredCatalogTypes()
    {
        return new List<CatalogType>()
        {
            new CatalogType() { Type = "Computer Case" },             // 1
            new CatalogType() { Type = "Desk Mount" },                // 2
            new CatalogType() { Type = "Gamepad" },                   // 3
            new CatalogType() { Type = "Graphics Card (GPU)" },       // 4
            new CatalogType() { Type = "Hard-Disk Drive (HDD)" },     // 5
            new CatalogType() { Type = "Headphones" },                // 6
            new CatalogType() { Type = "Keyboard" },                  // 7
            new CatalogType() { Type = "Laptop" },                    // 8
            new CatalogType() { Type = "Memory (RAM)" },              // 9
            new CatalogType() { Type = "Microphone" },                // 10
            new CatalogType() { Type = "Monitor" },                   // 11
            new CatalogType() { Type = "Motherboard" },               // 12
            new CatalogType() { Type = "Mouse" },                     // 13
            new CatalogType() { Type = "MousePad" },                  // 14
            new CatalogType() { Type = "Processor (CPU)" },           // 15
            new CatalogType() { Type = "Power Supply Unit (PSU)" },   // 16
            new CatalogType() { Type = "Solid-State Drive (SSD)" },   // 17
            new CatalogType() { Type = "SmartPhone" },                // 18
            new CatalogType() { Type = "SmartWatch" },                // 19
            new CatalogType() { Type = "Speakers" },                  // 20
            new CatalogType() { Type = "Subwoofer" },                 // 21
            new CatalogType() { Type = "Tablet" },                    // 22
            new CatalogType() { Type = "Web Camera" },                // 23
            new CatalogType() { Type = "Wrist Rest" },                // 24
        };
    }

    private static IEnumerable<CatalogItem> GetPreconfiguredItems()
    {
        return new List<CatalogItem>()
        {
            new CatalogItem
            {
                CatalogBrandId = 7,
                CatalogTypeId = 20,
                AvailableStock = 1,
                Description = "BLUETOOTH 5.0 WITH QUALCOMM APTX HD. SUB OUT. NATURAL SOUND REPRODUCTION. " +
                "UPDATED WIRELESS REMOTE. 2 YEAR WARRANTY.",
                Name = "R1700BTs Active Bluetooth Bookshelf Speakers - 2.0 Wireless Near Field " +
                "Studio Monitor Speaker - 66w RMS with Subwoofer Line Out",
                Price = 4599.00M,
                PictureFileName = "r1700bts.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 16,
                CatalogTypeId = 23,
                AvailableStock = 6,
                Description = "The C270 HD Webcam gives you sharp, smooth conference calls (720p/30fps) in a " +
                "widescreen format. Automatic light correction shows you in lifelike, natural colors.",
                Name = "C270 HD Webcam, HD 720p, Widescreen HD Video Calling, HD Light Correction, " +
                "Noise-Reducing Mic, For Skype, FaceTime, Hangouts, WebEx, PC/Mac/Laptop/Macbook/Tablet - Black",
                Price = 1299.00M,
                PictureFileName = "c270hd.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 14,
                CatalogTypeId = 7,
                AvailableStock = 5,
                Description = "75% Layot 84 Keys Ultra-Slim Wireless Bluetooth/USB Wired " +
                "Mechanical Keyboard with RGB LED Backlit, Low-Profile Keychron Optical " +
                "Hot-Swappable Brown Switches, Aluminium Frame, Compatible with Mac & Windows",
                Name = "K3 Version 2, 75% Layout 84 Keys Ultra-Slim Wireless Bluetooth / USB " +
                "Wired Mechanical Keyboard with RGB LED Backlit, Hot-Swappable Low-Profile " +
                "Keychron Optical Brown Switches, Compatible with Mac Windows",
                Price = 2990.00M,
                PictureFileName = "k3version2.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 14,
                CatalogTypeId = 7,
                AvailableStock = 5,
                Description = "A fully customizable 75% layout mechanical keyboard packed with all premium " +
                "features and unlimited possibilities.",
                Name = "Q1 - QMK Custom Mechanical Keyboard - Fully Assembled - Wired USB - Gateron Phantom Brown - Navy Blue",
                Price = 4700.00M,
                PictureFileName = "q1qmk.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 14,
                CatalogTypeId = 7,
                AvailableStock = 1,
                Description = "The Q2 is a fully customizable mechanical keyboard with a compact layout that pushes your " +
                "typing experience to the next level. With a 65% layout, full metal body, double-gasket design, the Q2 is " +
                "designed for a personalized experience and premium typing comfort.",
                Name = "Q2 - QMK Custom Mechanical Keyboard - Fully Assembled - Wired USB - Gateron G Pro Brown - Carbon Black",
                Price = 4800.00M,
                PictureFileName = "q2qmk.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 16,
                CatalogTypeId = 7,
                AvailableStock = 2,
                Description = "K360 is ready when you are. This compact wireless keyboard is ideal for " +
                "narrower built and allows you to perform even in constricted workspaces. Equipped with " +
                "a number pad and 12 easy access keys, you can be more productive -at home or at work.",
                Name = "K360 Wireless USB Desktop Keyboard — Compact Full Keyboard, 3-Year " +
                "Battery Life (Glossy Black)",
                Price = 1399.00M,
                PictureFileName = "k360.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 16,
                CatalogTypeId = 7,
                AvailableStock = 7,
                Description = "Logitech’s most advanced typing experience yet. MX Keys combines crafted keys " +
                "with smart illumination and a remarkably solid build.",
                Name = "MX Keys Advanced Wireless Illuminated Keyboard, Tactile Responsive Typing, " +
                "Backlighting, Bluetooth, USB-C, Apple macOS, Microsoft Windows, Linux, iOS, Android, Metal " +
                "Build - Graphite",
                Price = 2999.00M,
                PictureFileName = "mxkeys.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 18,
                CatalogTypeId = 7,
                AvailableStock = 2,
                Description = "Compact gaming keyboard featuring Razer Mechanical Switches, customizable lighting " +
                "powered by Razer Chroma RGB, and aluminum construction for amazing gaming experience.",
                Name = "BlackWidow V3 Tenkeyless TKL Mechanical Gaming Keyboard: Green Mechanical Switches " +
                "- Tactile & Clicky - Chroma RGB Lighting - Compact Form Factor - Programmable Macros ",
                Price = 2799.00M,
                PictureFileName = "blackwidowv3tkl.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 23,
                CatalogTypeId = 7,
                AvailableStock = 4,
                Description = "Dye-sub on the top printing.",
                Name = "Miya68-C Summit Series Wired Mechanical Keyboard",
                Price = 5900.00M,
                PictureFileName = "miya68csummitecswitchv2.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 23,
                CatalogTypeId = 7,
                AvailableStock = 2,
                Description = "Five-sides dye-sub printing.",
                Name = "MA87 Lovebirds-You Series Wired Mechanical Keyboard",
                Price = 6100.00M,
                PictureFileName = "ma87lovebirdsyou.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 23,
                CatalogTypeId = 7,
                AvailableStock = 4,
                Description = "Dye-sub on the top printing.",
                Name = "MA87M V2 Summit R2 EC V2 Daisy Wired USB Mechanical Keyboard",
                Price = 6000.00M,
                PictureFileName = "ma87mv2summitr2ecv2daisy.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 23,
                CatalogTypeId = 7,
                AvailableStock = 1,
                Description = "Five-sides dye-sub printing.",
                Name = "VA104S Phoenix Series Wired Mechanical Keyboard",
                Price = 6300.00M,
                PictureFileName = "va104sphoenix.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 23,
                CatalogTypeId = 7,
                AvailableStock = 3,
                Description = "Dye-sub on the top printing.",
                Name = "VBM108V2 Crane of Lure Series Wired Mechanical Keyboard",
                Price = 6800.00M,
                PictureFileName = "vbm108v2craneoflure.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 16,
                CatalogTypeId = 13,
                AvailableStock = 3,
                Description = "LIGHTSPEED wireless gaming mouse designed for serious performance with " +
                "latest technology innovations. Impressive 250-hour battery life. Now in a variety of " +
                "vibrant colors.",
                Name = "G305 LIGHTSPEED Wireless Gaming Mouse, Hero 12K Sensor, 12,000 DPI, " +
                "Lightweight, 6 Programmable Buttons, 250h Battery Life, On-Board Memory, PC/Mac - Blue",
                Price = 1899.00M,
                PictureFileName = "g305lightspeedblue.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 16,
                CatalogTypeId = 13,
                AvailableStock = 4,
                Description = "G502 SE HERO features an advanced optical sensor for maximum tracking " +
                "accuracy, customizable RGB lighting, custom game profiles, from 200 up to 25,600 DPI, " +
                "and repositionable weights.",
                Name = "G502 SE HERO High Performance RGB Gaming Mouse with 11 Programmable " +
                "Buttons USB Black/White",
                Price = 1699.00M,
                PictureFileName = "g502sehero.webp",
            },
            new CatalogItem
            {
                CatalogBrandId = 16,
                CatalogTypeId = 8,
                AvailableStock = 4,
                Description = "An advanced, precise mouse designed for creatives and engineered for coders, " +
                "featuring a side wheel for extra comfort and a natural feel.",
                Name = "MX Master 3 Advanced Wireless Mouse, Ultrafast Scrolling, Ergonomic, 4000 DPI, " +
                "Customization, USB-C, Bluetooth, USB, Apple Mac, Microsoft PC Windows, Linux, iPad - Graphite",
                Price = 2899.00M,
                PictureFileName = "mxmaster3.webp",
            },
        };
    }
}
