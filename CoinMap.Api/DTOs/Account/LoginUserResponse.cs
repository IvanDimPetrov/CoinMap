﻿namespace CoinMap.Api.DTOs.Account
{
    public class LoginUserResponse
    {
        public string Email { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
    }
}