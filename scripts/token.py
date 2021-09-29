#!/usr/bin/python3

from brownie import Token, accounts


def main():
    acct = accounts.load('ganache')
    return Token.deploy("Test Token", "PROMACOIN", 18, 1e21, {'from': acct})
