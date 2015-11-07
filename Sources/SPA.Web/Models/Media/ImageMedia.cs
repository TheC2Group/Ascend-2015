using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Framework.DataAnnotations;
using System;
using System.ComponentModel.DataAnnotations;

namespace SPA.Web.Models.Media
{
    [ContentType(DisplayName = "ImageMedia", GUID = "a8aed231-51a0-4390-8fae-af2a0d2f4f57", Description = "")]
    [MediaDescriptor(ExtensionString = "jpg,jpeg,gif,png,svg")]
    public class ImageMedia : ImageData
    {
        [CultureSpecific]
        [Editable(true)]
        [Display(
            Name = "Description",
            Description = "The image's description - rendered as the alt text",
            GroupName = SystemTabNames.Content,
            Order = 1)]
        public virtual String Description { get; set; }
    }
}