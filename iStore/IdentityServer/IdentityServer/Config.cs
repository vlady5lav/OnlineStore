// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System.Collections.Generic;

using IdentityServer4.Models;

using Microsoft.Extensions.Configuration;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new ApiScope[]
            {
                new ApiScope("spa", "SPA"),
                new ApiScope("catalog", "Catalog"),
                new ApiScope("catalog.bff", "Catalog BFF"),
                new ApiScope("basket", "Basket"),
                new ApiScope("basket.bff", "Basket Bff"),
            };
        }

        public static IEnumerable<Client> GetClients(IConfiguration configuration)
        {
            return new Client[]
            {
                new Client
                {
                    ClientId = "spa_pkce",
                    ClientName = "SPA PKCE Client",

                    ClientUri = $"{configuration["SpaUrl"]}",

                    AllowedGrantTypes = GrantTypes.Code,

                    ClientSecrets = { new Secret("secret".Sha256()) },

                    RedirectUris =
                    {
                        $"{configuration["SpaUrl"]}/signin-oidc",
                        $"{configuration["SpaUrl"]}/silentrenew",
                        $"{configuration["SpaUrl"]}/logout/callback"
                    },

                    PostLogoutRedirectUris = { $"{configuration["SpaUrl"]}/signout-oidc" },

                    AllowedCorsOrigins = { $"{configuration["SpaUrl"]}" },

                    RequirePkce = true,
                    RequireConsent = false,

                    AllowAccessTokensViaBrowser = true,

                    AllowedScopes = { "openid", "profile", "spa", "catalog.bff", "basket.bff" },
                },
                new Client
                {
                    ClientId = "catalogswaggerui",
                    ClientName = "Catalog Swagger UI",

                    AllowedGrantTypes = GrantTypes.Implicit,

                    AllowAccessTokensViaBrowser = true,

                    RedirectUris = { $"{configuration["CatalogApi"]}/swagger/oauth2-redirect.html" },

                    PostLogoutRedirectUris = { $"{configuration["CatalogApi"]}/swagger/" },

                    AllowedScopes = { "spa", "catalog", "catalog.bff" },
                },
                new Client
                {
                    ClientId = "basketswaggerui",
                    ClientName = "Basket Swagger UI",

                    AllowedGrantTypes = GrantTypes.Implicit,

                    AllowAccessTokensViaBrowser = true,

                    RedirectUris = { $"{configuration["BasketApi"]}/swagger/oauth2-redirect.html" },

                    PostLogoutRedirectUris = { $"{configuration["BasketApi"]}/swagger/" },

                    AllowedScopes = { "spa", "basket", "basket.bff" },
                },
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }
    }
}
