#!/bin/bash

# ============================================
# JEWELRY IMAGES DOWNLOADER
# Downloads high-quality jewelry images from Unsplash
# ============================================

DOWNLOAD_DIR="/home/user/Downloads"
cd "$DOWNLOAD_DIR" || exit

echo "Starting jewelry image downloads to $DOWNLOAD_DIR..."
echo "This will download 143 product images..."

# Function to download image
download_image() {
    local filename=$1
    local query=$2
    local url="https://source.unsplash.com/600x600/?${query}"

    echo "Downloading $filename..."
    curl -sL "$url" -o "$filename"
    sleep 0.5  # Small delay to avoid rate limiting
}

# ============================================
# WOMEN'S GOLD RINGS (12 images)
# ============================================
for i in {001..012}; do
    download_image "gold-rings-$i.jpg" "gold-ring,jewelry"
done

# ============================================
# WOMEN'S GOLD EARRINGS (12 images)
# ============================================
for i in {001..012}; do
    download_image "gold-earrings-$i.jpg" "gold-earrings,jewelry"
done

# ============================================
# WOMEN'S GOLD NECKLACES (8 images)
# ============================================
for i in {001..008}; do
    download_image "gold-necklaces-$i.jpg" "gold-necklace,jewelry"
done

# ============================================
# WOMEN'S GOLD PENDANTS (8 images)
# ============================================
for i in {001..008}; do
    download_image "gold-pendants-$i.jpg" "gold-pendant,jewelry"
done

# ============================================
# WOMEN'S GOLD BRACELETS (8 images)
# ============================================
for i in {001..008}; do
    download_image "gold-bracelets-$i.jpg" "gold-bracelet,jewelry"
done

# ============================================
# WOMEN'S GOLD ANKLETS (4 images)
# ============================================
for i in {001..004}; do
    download_image "gold-anklets-$i.jpg" "gold-anklet,jewelry"
done

# ============================================
# WOMEN'S GOLD NOSEPINS (4 images)
# ============================================
for i in {001..004}; do
    download_image "gold-nosepins-$i.jpg" "nose-ring,gold-jewelry"
done

# ============================================
# WOMEN'S GOLD CHAINS (5 images)
# ============================================
for i in {001..005}; do
    download_image "gold-chains-$i.jpg" "gold-chain,jewelry"
done

# ============================================
# WOMEN'S GOLD BANGLES (5 images)
# ============================================
for i in {001..005}; do
    download_image "gold-bangles-$i.jpg" "gold-bangle,jewelry"
done

# ============================================
# WOMEN'S GOLD MANGALSUTRA (4 images)
# ============================================
for i in {001..004}; do
    download_image "gold-mangalsutra-$i.jpg" "indian-jewelry,gold-necklace"
done

# ============================================
# WOMEN'S GOLD SETS (4 images)
# ============================================
for i in {001..004}; do
    download_image "gold-sets-$i.jpg" "gold-jewelry-set"
done

# ============================================
# WOMEN'S SILVER RINGS (12 images)
# ============================================
for i in {001..012}; do
    download_image "silver-rings-$i.jpg" "silver-ring,jewelry"
done

# ============================================
# WOMEN'S SILVER EARRINGS (12 images)
# ============================================
for i in {001..012}; do
    download_image "silver-earrings-$i.jpg" "silver-earrings,jewelry"
done

# ============================================
# WOMEN'S SILVER NECKLACES (8 images)
# ============================================
for i in {001..008}; do
    download_image "silver-necklaces-$i.jpg" "silver-necklace,jewelry"
done

# ============================================
# WOMEN'S SILVER PENDANTS (8 images)
# ============================================
for i in {001..008}; do
    download_image "silver-pendants-$i.jpg" "silver-pendant,jewelry"
done

# ============================================
# WOMEN'S SILVER BRACELETS (8 images)
# ============================================
for i in {001..008}; do
    download_image "silver-bracelets-$i.jpg" "silver-bracelet,jewelry"
done

# ============================================
# WOMEN'S SILVER ANKLETS (4 images)
# ============================================
for i in {001..004}; do
    download_image "silver-anklets-$i.jpg" "silver-anklet,jewelry"
done

# ============================================
# WOMEN'S SILVER NOSEPINS (4 images)
# ============================================
for i in {001..004}; do
    download_image "silver-nosepins-$i.jpg" "nose-ring,silver-jewelry"
done

# ============================================
# WOMEN'S SILVER CHAINS (4 images)
# ============================================
for i in {001..004}; do
    download_image "silver-chains-$i.jpg" "silver-chain,jewelry"
done

# ============================================
# WOMEN'S SILVER BANGLES (4 images)
# ============================================
for i in {001..004}; do
    download_image "silver-bangles-$i.jpg" "silver-bangle,jewelry"
done

# ============================================
# WOMEN'S SILVER SETS (4 images)
# ============================================
for i in {001..004}; do
    download_image "silver-sets-$i.jpg" "silver-jewelry-set"
done

# ============================================
# MEN'S GOLD RINGS (5 images)
# ============================================
for i in {001..005}; do
    download_image "men-gold-rings-$i.jpg" "mens-gold-ring,jewelry"
done

# ============================================
# MEN'S GOLD BRACELETS (4 images)
# ============================================
for i in {001..004}; do
    download_image "men-gold-bracelets-$i.jpg" "mens-gold-bracelet"
done

# ============================================
# MEN'S GOLD CHAINS (4 images)
# ============================================
for i in {001..004}; do
    download_image "men-gold-chains-$i.jpg" "mens-gold-chain"
done

# ============================================
# MEN'S GOLD PENDANTS (3 images)
# ============================================
for i in {001..003}; do
    download_image "men-gold-pendants-$i.jpg" "mens-gold-pendant"
done

# ============================================
# MEN'S GOLD KADAS (2 images)
# ============================================
for i in {001..002}; do
    download_image "men-gold-kadas-$i.jpg" "mens-gold-bracelet,kada"
done

# ============================================
# MEN'S SILVER RINGS (5 images)
# ============================================
for i in {001..005}; do
    download_image "men-silver-rings-$i.jpg" "mens-silver-ring"
done

# ============================================
# MEN'S SILVER BRACELETS (4 images)
# ============================================
for i in {001..004}; do
    download_image "men-silver-bracelets-$i.jpg" "mens-silver-bracelet"
done

# ============================================
# MEN'S SILVER CHAINS (4 images)
# ============================================
for i in {001..004}; do
    download_image "men-silver-chains-$i.jpg" "mens-silver-chain"
done

# ============================================
# MEN'S SILVER PENDANTS (3 images)
# ============================================
for i in {001..003}; do
    download_image "men-silver-pendants-$i.jpg" "mens-silver-pendant"
done

# ============================================
# MEN'S SILVER KADAS (2 images)
# ============================================
for i in {001..002}; do
    download_image "men-silver-kadas-$i.jpg" "mens-silver-bracelet,kada"
done

echo ""
echo "============================================"
echo "DOWNLOAD COMPLETE!"
echo "============================================"
echo "Total images downloaded: 143"
echo "Location: $DOWNLOAD_DIR"
echo ""
echo "Next steps:"
echo "1. Review images in $DOWNLOAD_DIR"
echo "2. Upload to Supabase Storage bucket: 'product-images'"
echo "3. Update image URLs in gold-silver-products.sql"
echo "4. Run SQL files in Supabase"
echo "============================================"
